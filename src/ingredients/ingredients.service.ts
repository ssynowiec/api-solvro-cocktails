import { eq } from "drizzle-orm";

import { Injectable } from "@nestjs/common";

import { database } from "../database";
import {
  CreateIngredientDto,
  UpdateIngredientDto,
  ingredients,
} from "../db/schema/ingredients";

@Injectable()
export class IngredientsService {
  create(createIngredientDto: CreateIngredientDto) {
    return database.insert(ingredients).values(createIngredientDto).returning();
  }

  findAll() {
    return database.select().from(ingredients);
  }

  findOne(id: number) {
    return database
      .select()
      .from(ingredients)
      .where(eq(ingredients.id, id))
      .limit(1);
  }

  update(id: number, updateIngredientDto: UpdateIngredientDto) {
    return database
      .update(ingredients)
      .set(updateIngredientDto)
      .where(eq(ingredients.id, id));
  }

  remove(id: number) {
    return database
      .delete(ingredients)
      .where(eq(ingredients.id, id))
      .returning();
  }
}
