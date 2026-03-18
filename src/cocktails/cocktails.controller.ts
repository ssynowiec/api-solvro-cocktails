import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UsePipes,
} from "@nestjs/common";
import {
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from "@nestjs/swagger";

import { ZodValidationPipe } from "../common/pipes/zod.pipe";
import type {
  CreateCocktailDto,
  UpdateCocktailDto,
} from "../db/schema/cocktails";
import { CocktailDto, cocktailInsertSchema } from "../db/schema/cocktails";
import type { PaginationDto } from "../pagination/pagination.schema";
import { paginationSchema } from "../pagination/pagination.schema";
import { CocktailsService } from "./cocktails.service";

class PaginatedCocktails {
  data: CocktailDto[];
  meta: {
    page: number;
    limit: number;
    total: number;
    pageCount: number;
  };
}

@ApiTags("cocktails")
@Controller("cocktails")
export class CocktailsController {
  constructor(private readonly cocktailsService: CocktailsService) {}

  @Post()
  @UsePipes(new ZodValidationPipe(cocktailInsertSchema))
  create(@Body() createCocktailDto: CreateCocktailDto) {
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
  @UsePipes(new ZodValidationPipe(paginationSchema))
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
