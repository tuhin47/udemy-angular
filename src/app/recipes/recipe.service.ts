import {EventEmitter, Injectable} from "@angular/core";
import {Recipe} from "./recipe.model";

@Injectable()
export class RecipeService {
  private recipes: Recipe[] = [
    new Recipe("A","A desc","https://i.imgur.com/sdA4txt.png"),
    new Recipe("Another","A desc","https://i.imgur.com/sdA4txt.png"),
  ];
  recipeSelected = new EventEmitter<Recipe>();

  getRecipes() {
    return this.recipes.slice();
  }

}
