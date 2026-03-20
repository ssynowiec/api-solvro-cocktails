import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

import { PartialType } from "@nestjs/mapped-types";
import { ApiProperty } from "@nestjs/swagger";

@Entity()
export class Ingredient {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: "Mojito",
    description: "The name of the cocktail",
  })
  @Column()
  name: string;

  @ApiProperty({
    example: "Lime",
    description: "The name of the ingredient",
  })
  @Column()
  description: string;

  @ApiProperty({
    example: true,
    description: "Whether the ingredient is alcoholic",
  })
  @Column()
  alcohol: boolean;
}

export class UpdateIngredientDto extends PartialType(Ingredient) {}
