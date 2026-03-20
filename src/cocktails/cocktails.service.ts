import { eq } from "drizzle-orm";

import { Injectable } from "@nestjs/common";

import { database } from "../database";
import {
  CreateCocktailsWithIngredients,
  cocktailIngredients,
} from "../db/schema/cocktail-ingredniet";
import { UpdateCocktailDto, cocktails } from "../db/schema/cocktails";
import { PaginationDto } from "../pagination/pagination.schema";

@Injectable()
export class CocktailsService {
  async create(createCocktailDto: CreateCocktailsWithIngredients) {
    const { ingredients, ...cocktailData } = createCocktailDto;

    await database.transaction(async (tx) => {
      const [cocktail] = await tx
        .insert(cocktails)
        .values(cocktailData)
        .returning();

      const cocktailIngredientsData = ingredients.map((ingredient) => ({
        cocktailId: cocktail.id,
        ingredientId: ingredient.id,
        amount: ingredient.amount,
      }));

      await tx.insert(cocktailIngredients).values(cocktailIngredientsData);
    });

    return database.insert(cocktails).values(createCocktailDto).returning();
  }

  async findAll(query: PaginationDto) {
    const { page, limit } = query;
    const offset = (page - 1) * limit;
    const data = await database
      .select()
      .from(cocktails)
      .limit(limit)
      .offset(offset);

    const total = await database.$count(cocktails);

    return {
      data,
      meta: { limit, page, total, pageCount: Math.ceil(total / limit) },
    };
  }

  async findOne(id: number) {
    return await database.query.cocktails.findMany({
      with: {
        ingredients: {
          columns: {
            cocktailId: false,
            ingredientId: false,
          },
          with: {
            ingredient: true,
          },
        },
      },
      where: eq(cocktails.id, id),
    });
  }

  update(id: number, updateCocktailDto: UpdateCocktailDto) {
    return database
      .update(cocktails)
      .set(updateCocktailDto)
      .where(eq(cocktails.id, id))
      .returning();
  }

  remove(id: number) {
    return database.delete(cocktails).where(eq(cocktails.id, id)).returning();
  }
}
