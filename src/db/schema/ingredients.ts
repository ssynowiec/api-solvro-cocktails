import { boolean, integer, pgTable, text } from "drizzle-orm/pg-core";
import {
  createInsertSchema,
  createSelectSchema,
  createUpdateSchema,
} from "drizzle-zod";
import type { z } from "zod";

export const ingredients = pgTable("ingredients", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: text().notNull(),
  description: text(),
  alcoholic: boolean().notNull(),
});

export const ingredientSelectSchema = createSelectSchema(ingredients);
export const ingredientInsertSchema = createInsertSchema(ingredients);
export const ingredientUpdateSchema = createUpdateSchema(ingredients);

export type IngredientDto = z.infer<typeof ingredientSelectSchema>;
export type CreateIngredientDto = z.infer<typeof ingredientInsertSchema>;
export type UpdateIngredientDto = z.infer<typeof ingredientUpdateSchema>;
