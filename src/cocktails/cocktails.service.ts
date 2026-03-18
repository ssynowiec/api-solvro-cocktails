import { eq } from "drizzle-orm";

import { Injectable } from "@nestjs/common";

import { database } from "../database";
import {
  CreateCocktailDto,
  UpdateCocktailDto,
  cocktails,
} from "../db/schema/cocktails";
import { PaginationDto } from "../pagination/pagination.schema";

@Injectable()
export class CocktailsService {
  create(createCocktailDto: CreateCocktailDto) {
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

  findOne(id: number) {
    return database
      .select()
      .from(cocktails)
      .where(eq(cocktails.id, id))
      .limit(1);
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
