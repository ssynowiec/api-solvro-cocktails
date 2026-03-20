import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from "@nestjs/common";
import {
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from "@nestjs/swagger";

import { PaginationDto } from "../pagination/entities/pagination.dto";
import { CocktailsService } from "./cocktails.service";
import { Cocktail, UpdateCocktailDto } from "./entities/cocktail.entity";

class PaginatedCocktails {
  data: Cocktail[];
  meta: PaginationDto;
}

@ApiTags("cocktails")
@Controller("cocktails")
export class CocktailsController {
  constructor(private readonly cocktailsService: CocktailsService) {}

  @Post()
  @ApiOperation({ summary: "Create a new cocktail with ingredients" })
  @ApiBody({
    required: false,
    type: Cocktail,
    examples: {
      cocktail: {
        value: {
          name: "Mojito",
          category: "Cocktail",
          instructions: "Mix ingredients and serve over ice.",
        },
        summary: "Example cocktail creation payload",
      },
    },
    description: "The cocktail to create",
  })
  @ApiOkResponse({
    type: Cocktail,
    example: {
      id: 1,
      name: "Mojito",
      category: "Cocktail",
      instructions: "Mix ingredients and serve over ice.",
    },
  })
  async create(@Body() createCocktailDto: Cocktail) {
    return this.cocktailsService.create(createCocktailDto);
  }

  @Get()
  @ApiQuery({
    name: "page",
    required: false,
    type: Number,
    example: 1,
    default: 1,
  })
  @ApiQuery({
    name: "limit",
    required: false,
    type: Number,
    example: 10,
    default: 10,
  })
  @ApiOperation({ summary: "Get all cocktails with pagination" })
  @ApiOkResponse({
    type: PaginatedCocktails,
    example: {
      data: [
        {
          id: 1,
          name: "Mojito",
        },
      ],
      meta: { limit: 10, page: 1, total: 0, pageCount: 0 },
    },
  })
  async findAll(@Query() query: PaginationDto) {
    return this.cocktailsService.findAll(query);
  }

  @Get(":id")
  @ApiOperation({ summary: "Get a cocktail by ID" })
  async findOne(@Param("id") id: string) {
    return this.cocktailsService.findOne(+id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Update a cocktail by ID" })
  async update(
    @Param("id") id: string,
    @Body() updateCocktailDto: UpdateCocktailDto,
  ) {
    return this.cocktailsService.update(+id, updateCocktailDto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete a cocktail by ID" })
  async remove(@Param("id") id: string) {
    return this.cocktailsService.remove(+id);
  }
}
