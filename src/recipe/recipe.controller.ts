import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post } from '@nestjs/common';
import { RecipeService } from './recipe.service';
import { RecipeDto } from './dto/recipe.dto';

@Controller('recipe')
export class RecipeController {
  constructor(private recipeService: RecipeService) {}

  @Get()
  async getRecipes() {
    return this.recipeService.getRecipes();
  }

  @Get('/:id')
  async getRecipe(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.recipeService.getRecipe(id);
  }

  @Post()
  async createRecipe(@Body() recipeDto: RecipeDto) {
    return this.recipeService.createRecipe(recipeDto);
  }

  @Patch('/:id')
  async updateRecipe(@Body() recipeDto: RecipeDto, @Param('id', new ParseUUIDPipe()) id: string) {
    return this.recipeService.updateRecipe(id, recipeDto);
  }

  @Delete('/:id')
  async removeRecipe(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.recipeService.removeRecipe(id);
  }
}
