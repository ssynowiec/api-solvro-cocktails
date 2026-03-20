import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { CocktailsModule } from "./cocktails/cocktails.module";
import { env } from "./env";
import { IngredientsModule } from "./ingredients/ingredients.module";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "postgres",
      host: env.DATABASE_HOST,
      port: env.DATABASE_PORT,
      username: env.DATABASE_USER,
      password: env.DATABASE_PASSWORD,
      database: env.DATABASE_NAME,
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
