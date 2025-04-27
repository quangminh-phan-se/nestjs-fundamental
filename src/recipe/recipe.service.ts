import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Recipe } from './entity/recipe';
import { RecipeDto } from './dto/recipe.dto';
import { isEmpty } from 'src/lodash';

@Injectable()
export class RecipeService {
  private _recipe: Recipe[] = [];

  async getRecipes(): Promise<Recipe[]> {
    return await Promise.resolve(this._recipe);
  }

  async getRecipe(id: string): Promise<Recipe> {
    const recipe = this._recipe.find((recipe: Recipe) => recipe.id === id);

    if (isEmpty(recipe)) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }

    return await Promise.resolve(recipe as Recipe);
  }

  async createRecipe(recipe: RecipeDto): Promise<Recipe> {
    const recipeEntity: Recipe = { ...recipe, id: self.crypto.randomUUID() };
    this._recipe.push(recipeEntity);
    return await Promise.resolve(recipeEntity);
  }

  async updateRecipe(id: string, recipe: RecipeDto): Promise<Recipe> {
    const recipeIndex = this._recipe.findIndex((recipe: Recipe) => recipe.id === id);

    if (recipeIndex < 0) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }

    const { description, ingredients } = recipe;

    this._recipe[recipeIndex] = {
      ...this._recipe[recipeIndex],
      description: description || this._recipe[recipeIndex].description,
      ingredients: !isEmpty(ingredients) ? ingredients : this._recipe[recipeIndex].ingredients,
    };

    return Promise.resolve(this._recipe[recipeIndex]);
  }

  async removeRecipe(id: string): Promise<Recipe[]> {
    this._recipe = this._recipe.filter((recipe: Recipe) => recipe.id !== id);

    return Promise.resolve(this._recipe);
  }
}
