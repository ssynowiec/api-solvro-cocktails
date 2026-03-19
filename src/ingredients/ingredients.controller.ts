import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";

import type {
  CreateIngredientDto,
  UpdateIngredientDto,
} from "../db/schema/ingredients";
import { IngredientsService } from "./ingredients.service";

@ApiTags("Ingredients")
@Controller("ingredients")
export class IngredientsController {
  constructor(private readonly ingredientsService: IngredientsService) {}

  @Post()
  create(@Body() createIngredientDto: CreateIngredientDto) {
    return this.ingredientsService.create(createIngredientDto);
  }

  @Get()
  findAll() {
    return this.ingredientsService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.ingredientsService.findOne(+id);
  }

  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateIngredientDto: UpdateIngredientDto,
  ) {
    return this.ingredientsService.update(+id, updateIngredientDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.ingredientsService.remove(+id);
  }
}
