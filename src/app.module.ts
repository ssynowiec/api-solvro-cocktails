import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { CocktailsModule } from "./cocktails/cocktails.module";
import { IngredientsModule } from "./ingredients/ingredients.module";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "postgres",
      host: "localhost",
      port: 5432,
      username: "admin",
      password: "admin",
      database: "api-cocktails-solvro",
      autoLoadEntities: true,
      synchronize: true,
    }),
    CocktailsModule,
    IngredientsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
