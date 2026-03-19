import { integer, pgTable, primaryKey, text } from "drizzle-orm/pg-core";

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
