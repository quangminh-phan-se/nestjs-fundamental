import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecipeModule } from './recipe/recipe.module';
import { configDatabase } from './configs/database.config';

@Module({
  imports: [RecipeModule, TypeOrmModule.forRoot(configDatabase.getTypeOrmConfig())],
  controllers: [],
  providers: [],
})
export class AppModule {}
