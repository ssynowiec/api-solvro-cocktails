import { relations } from "drizzle-orm";

import { cocktailIngredients } from "./schema/cocktail-ingredniet";
import { cocktails } from "./schema/cocktails";
import { ingredients } from "./schema/ingredients";

export const cocktailsRelations = relations(cocktails, ({ many }) => ({
  ingredients: many(cocktailIngredients),
}));

export const ingredientsRelations = relations(ingredients, ({ many }) => ({
  ingredients: many(cocktailIngredients),
}));

export const cocktailIngredientsRelations = relations(
  cocktailIngredients,
  ({ one }) => ({
    cocktail: one(cocktails, {
      fields: [cocktailIngredients.cocktailId],
      references: [cocktails.id],
    }),
    ingredient: one(ingredients, {
      fields: [cocktailIngredients.ingredientId],
      references: [ingredients.id],
    }),
  }),
);
