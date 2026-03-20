import { Repository } from "typeorm";

import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { PaginationDto } from "../pagination/entities/pagination.dto";
import { Ingredient, UpdateIngredientDto } from "./entities/ingredient.entity";

@Injectable()
export class IngredientsService {
  constructor(
    @InjectRepository(Ingredient)
    private ingredientRepository: Repository<Ingredient>,
  ) {}

  async create(createIngredientDto: Ingredient) {
    const entity = this.ingredientRepository.create(createIngredientDto);
    return this.ingredientRepository.save(entity);
  }

  async findAll(query: PaginationDto) {
    const { page, limit } = query;
    const skip = (page - 1) * limit;

    const [data, total] = await this.ingredientRepository.findAndCount({
      skip,
      take: limit,
    });

    return {
      data,
      meta: {
        total,
        page,
        limit,
        lastPage: Math.ceil(total / limit),
      },
    };
  }

  async findOne(id: number) {
    return this.ingredientRepository.findOneBy({ id });
  }

  async update(id: number, updateIngredientDto: UpdateIngredientDto) {
    await this.ingredientRepository.update(id, updateIngredientDto);
    return this.ingredientRepository.findOneBy({ id });
  }

  async remove(id: number) {
    return this.ingredientRepository.delete(id);
  }
}
