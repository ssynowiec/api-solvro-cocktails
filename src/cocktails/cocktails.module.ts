import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { CocktailsController } from "./cocktails.controller";
import { CocktailsService } from "./cocktails.service";
import { Cocktail } from "./entities/cocktail.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Cocktail])],
  controllers: [CocktailsController],
  providers: [CocktailsService],
})
export class CocktailsModule {}
