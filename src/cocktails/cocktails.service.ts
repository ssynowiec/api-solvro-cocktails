import { eq } from "drizzle-orm";

import { Injectable } from "@nestjs/common";

import { database } from "../database";
import {
  CreateCocktailDto,
  UpdateCocktailDto,
  cocktails,
} from "../db/schema/cocktails";

@Injectable()
export class CocktailsService {
  create(createCocktailDto: CreateCocktailDto) {
    return database.insert(cocktails).values(createCocktailDto).returning();
  }

  findAll() {
    return database.select().from(cocktails);
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
