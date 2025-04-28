import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Recipe } from './entity/recipe';
import { RecipeDto } from './dto/recipe.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { isEmpty } from 'class-validator';

@Injectable()
export class RecipeService {
  constructor(@InjectRepository(Recipe) private recipeRepository: Repository<Recipe>) {}

  async getRecipes(): Promise<Recipe[]> {
    return this.recipeRepository.find();
  }

  async getRecipe(id: string): Promise<Recipe> {
    const recipe = await this.recipeRepository.findOne({ where: { id } });
    if (!recipe) {
      throw new HttpException('No entity found', HttpStatus.NOT_FOUND);
    }
    return recipe;
  }

  async createRecipe(recipeDto: RecipeDto): Promise<void> {
    await this.recipeRepository.save({ ...recipeDto });
  }

  async updateRecipe(id: string, recipe: RecipeDto): Promise<void> {
    const recipeData = await this.recipeRepository.findOne({ where: { id } });
    if (isEmpty(recipeData)) {
      throw new HttpException('No entity found', HttpStatus.NOT_FOUND);
    }

    const { description } = recipe;

    console.log({ description });

    await this.recipeRepository.update({ id }, { description: description });
  }

  async removeRecipe(id: string): Promise<void> {
    console.log({ id });
    await this.recipeRepository.delete({ id });
  }
}
