import { Repository } from "typeorm";

import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { PaginationDto } from "../pagination/entities/pagination.dto";
import { Cocktail, UpdateCocktailDto } from "./entities/cocktail.entity";

@Injectable()
export class CocktailsService {
  constructor(
    @InjectRepository(Cocktail)
    private cocktailRepository: Repository<Cocktail>,
  ) {}

  async create(createCocktailDto: Cocktail) {
    const entity = this.cocktailRepository.create(createCocktailDto);

    return this.cocktailRepository.save(entity);
  }

  async findAll(query: PaginationDto) {
    const { page, limit } = query;
    const skip = (page - 1) * limit;

    const [data, total] = await this.cocktailRepository.findAndCount({
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
    return this.cocktailRepository.findOneBy({ id });
  }

  async update(id: number, updateCocktailDto: UpdateCocktailDto) {
    await this.cocktailRepository.update(id, updateCocktailDto);
    return this.cocktailRepository.findOneBy({ id });
  }

  async remove(id: number) {
    return this.cocktailRepository.delete(id);
  }
}
