import { integer, pgTable, primaryKey, text } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { createZodDto } from "nestjs-zod";
import { z } from "zod";

import { cocktails } from "./cocktails";
import { ingredients } from "./ingredients";

export const cocktailIngredients = pgTable(
  "cocktail_ingredients",
  {
    cocktailId: integer()
      .references(() => cocktails.id)
      .notNull(),
    ingredientId: integer()
      .references(() => ingredients.id)
      .notNull(),
    amount: text(),
  },
  (t) => [primaryKey({ columns: [t.cocktailId, t.ingredientId] })],
);

export const createCocktailsWithIngredientsSchema = createInsertSchema(
  cocktails,
).extend({
  ingredients: z
    .array(
      z.object({
        id: z.number(),
        amount: z.string().nullable().optional(),
      }),
    )
    .min(1),
});

export class CreateCocktailsWithIngredients extends createZodDto(
  createCocktailsWithIngredientsSchema,
) {}
