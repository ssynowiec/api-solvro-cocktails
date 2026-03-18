import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from "@nestjs/common";

import type {
  CreateCocktailDto,
  UpdateCocktailDto,
} from "../db/schema/cocktails";
import { CocktailsService } from "./cocktails.service";

@Controller("cocktails")
export class CocktailsController {
  constructor(private readonly cocktailsService: CocktailsService) {}

  @Post()
  create(@Body() createCocktailDto: CreateCocktailDto) {
    return this.cocktailsService.create(createCocktailDto);
  }

  @Get()
  findAll() {
    return this.cocktailsService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.cocktailsService.findOne(+id);
  }

  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateCocktailDto: UpdateCocktailDto,
  ) {
    return this.cocktailsService.update(+id, updateCocktailDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.cocktailsService.remove(+id);
  }
}
