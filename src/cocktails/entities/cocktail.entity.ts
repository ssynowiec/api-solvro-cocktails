import { Allow, IsEnum, IsOptional, IsString } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

import { PartialType } from "@nestjs/mapped-types";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

enum Category {
  "Cocktail" = "Cocktail",
  "Ordinary Drink" = "Ordinary Drink",
  "Punch / Party Drink" = "Punch / Party Drink",
  "Shake" = "Shake",
  "Other / Unknown" = "Other / Unknown",
  "Cocoa" = "Cocoa",
  "Shot" = "Shot",
  "Coffee / Tea" = "Coffee / Tea",
  "Homemade Liqueur" = "Homemade Liqueur",
  "Soft Drink" = "Soft Drink",
}

@Entity()
export class Cocktail {
  @ApiProperty({
    example: 1,
    description: "The unique identifier of the cocktail",
  })
  @Allow()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: "Mojito",
    description: "The name of the cocktail",
  })
  @IsString()
  @Column()
  name: string;

  @ApiProperty({
    enum: Category,
    example: Category.Cocktail,
    enumName: "Category",
  })
  @IsEnum(Category)
  @Column({
    type: "enum",
    enum: Category,
    default: Category["Other / Unknown"],
  })
  category: Category;

  @ApiPropertyOptional({
    example: "Mix ingredients and serve over ice.",
    description: "The unique identifier of the cocktail",
  })
  @IsString()
  @IsOptional()
  @Column({ nullable: true })
  instructions?: string;
}

export class UpdateCocktailDto extends PartialType(Cocktail) {}
