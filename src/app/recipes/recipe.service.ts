import {Injectable} from "@angular/core";
import {Recipe} from "./recipe.model";
import {Ingredient} from "../shared/ingredient.model";
import {ShoppingListService} from "../shopping-list/shopping-list.service";

@Injectable()
export class RecipeService {
  private recipes: Recipe[] = [
    new Recipe("A", "A desc", "https://i.imgur.com/sdA4txt.png", [
      new Ingredient('Meat', 1),
      new Ingredient('FF', 2)
    ]),
    new Recipe("Another", "A desc", "https://i.imgur.com/sdA4txt.png", [
      new Ingredient('GG', 3),
      new Ingredient('DF', 5)
    ]),
  ];

  constructor(private slService: ShoppingListService) {

  }
  getRecipes() {
    return this.recipes.slice();
  }

  addIngredientToShoppingList(ingredients: Ingredient[]) {
    this.slService.addIngredients(ingredients);
  }

  getRecipeById(index: number) : Recipe{
    return this.recipes[index];
  }
}
