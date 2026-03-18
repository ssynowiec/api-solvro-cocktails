import { integer, pgTable, text } from "drizzle-orm/pg-core";
import {
  createInsertSchema,
  createSelectSchema,
  createUpdateSchema,
} from "drizzle-zod";
import type { z } from "zod";

export const cocktails = pgTable("cocktails", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: text().notNull(),
});

export const cocktailSelectSchema = createSelectSchema(cocktails);
export const cocktailInsertSchema = createInsertSchema(cocktails);
export const cocktailUpdateSchema = createUpdateSchema(cocktails);

export type CocktailDto = z.infer<typeof cocktailSelectSchema>;
export type CreateCocktailDto = z.infer<typeof cocktailInsertSchema>;
export type UpdateCocktailDto = z.infer<typeof cocktailUpdateSchema>;
