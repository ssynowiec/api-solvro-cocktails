import {
  cocktailIngredientsRelations,
  cocktailsRelations,
  ingredientsRelations,
} from "./relations";
import { cocktailIngredients } from "./schema/cocktail-ingredniet";
import { cocktails } from "./schema/cocktails";
import { ingredients } from "./schema/ingredients";

export const schema = {
  cocktails,
  ingredients,
  cocktailIngredients,
  cocktailsRelations,
  ingredientsRelations,
  cocktailIngredientsRelations,
};
