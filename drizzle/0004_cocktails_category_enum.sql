CREATE TYPE "public"."categories" AS ENUM('Cocktail', 'Ordinary Drink', 'Punch / Party Drink', 'Shake', 'Other / Unknown', 'Cocoa', 'Shot', 'Coffee / Tea', 'Homemade Liqueur', 'Soft Drink');--> statement-breakpoint
ALTER TABLE "cocktails" ADD COLUMN "category" "categories" DEFAULT 'Other / Unknown' NOT NULL;--> statement-breakpoint
ALTER TABLE "cocktails" ADD COLUMN "instructions" text NOT NULL;