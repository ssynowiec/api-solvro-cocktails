ALTER TABLE "recipe_ingredients" RENAME TO "cocktail_ingredients";--> statement-breakpoint
ALTER TABLE "cocktail_ingredients" RENAME COLUMN "recipe_id" TO "cocktailId";--> statement-breakpoint
ALTER TABLE "cocktail_ingredients" RENAME COLUMN "ingredient_id" TO "ingredientId";--> statement-breakpoint
ALTER TABLE "cocktail_ingredients" DROP CONSTRAINT "recipe_ingredients_recipe_id_cocktails_id_fk";
--> statement-breakpoint
ALTER TABLE "cocktail_ingredients" DROP CONSTRAINT "recipe_ingredients_ingredient_id_ingredients_id_fk";
--> statement-breakpoint
ALTER TABLE "cocktail_ingredients" DROP CONSTRAINT "recipe_ingredients_recipe_id_ingredient_id_pk";--> statement-breakpoint
ALTER TABLE "cocktail_ingredients" ADD CONSTRAINT "cocktail_ingredients_cocktailId_ingredientId_pk" PRIMARY KEY("cocktailId","ingredientId");--> statement-breakpoint
ALTER TABLE "cocktail_ingredients" ADD CONSTRAINT "cocktail_ingredients_cocktailId_cocktails_id_fk" FOREIGN KEY ("cocktailId") REFERENCES "public"."cocktails"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "cocktail_ingredients" ADD CONSTRAINT "cocktail_ingredients_ingredientId_ingredients_id_fk" FOREIGN KEY ("ingredientId") REFERENCES "public"."ingredients"("id") ON DELETE no action ON UPDATE no action;