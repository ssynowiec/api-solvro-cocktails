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
import { Ingredient, UpdateIngredientDto } from "./entities/ingredient.entity";
import { IngredientsService } from "./ingredients.service";

class PaginatedIngredients {
  data: Ingredient[];
  meta: PaginationDto;
}

@ApiTags("Ingredients")
@Controller("ingredients")
export class IngredientsController {
  constructor(private readonly ingredientsService: IngredientsService) {}

  @Post()
  @ApiOperation({ summary: "Create a new ingredient" })
  @ApiBody({
    required: false,
    type: Ingredient,
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
    type: Ingredient,
    example: {
      id: 1,
      name: "Mojito",
      category: "Cocktail",
      instructions: "Mix ingredients and serve over ice.",
    },
  })
  async create(@Body() createIngredientDto: Ingredient) {
    return this.ingredientsService.create(createIngredientDto);
  }

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
    type: PaginatedIngredients,
    example: {
      data: [
        {
          id: 1,
          name: "Mojito",
          description:
            "A refreshing cocktail made with rum, lime juice, sugar, mint, and soda water.",
        },
      ],
      meta: { limit: 10, page: 1, total: 0, pageCount: 0 },
    },
  })
  @Get()
  async findAll(@Query() query: PaginationDto) {
    return this.ingredientsService.findAll(query);
  }

  @Get(":id")
  @ApiOperation({ summary: "Get a ingredient by ID" })
  async findOne(@Param("id") id: string) {
    return this.ingredientsService.findOne(+id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Update a ingredient by ID" })
  async update(
    @Param("id") id: string,
    @Body() updateIngredientDto: UpdateIngredientDto,
  ) {
    return this.ingredientsService.update(+id, updateIngredientDto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete a ingredient by ID" })
  async remove(@Param("id") id: string) {
    return this.ingredientsService.remove(+id);
  }
}
