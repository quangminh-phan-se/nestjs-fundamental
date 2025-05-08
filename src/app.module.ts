import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecipeModule } from './recipe/recipe.module';
import { configDatabase } from './configs/database.config';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [RecipeModule, TypeOrmModule.forRoot(configDatabase.getTypeOrmConfig()), AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
