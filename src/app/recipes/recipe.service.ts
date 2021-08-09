import {Injectable} from "@angular/core";
import {Recipe} from "./recipe.model";
import {Ingredient} from "../shared/ingredient.model";
import {Subject} from "rxjs";
import {Store} from "@ngrx/store";
import * as ShoppingListActions from "../shopping-list/store/shopping-list.actions";
import {AppState} from "../store/app.reducer";

@Injectable()
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();
  private recipes: Recipe[] =[];/*= [
    new Recipe("A", "A desc", "https://i.imgur.com/sdA4txt.png", [
      new Ingredient('Meat', 1),
      new Ingredient('FF', 2)
    ]),
    new Recipe("Another", "A desc", "https://i.imgur.com/sdA4txt.png", [
      new Ingredient('GG', 3),
      new Ingredient('DF', 5)
    ]),
  ];*/

  constructor(private store: Store<AppState>) {

  }

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.updateRecipes();
  }

  private updateRecipes() {
    this.recipesChanged.next(this.recipes.slice());
  }

  getRecipes() {
    return this.recipes.slice();
  }

  addIngredientToShoppingList(ingredients: Ingredient[]) {
    // this.slService.addIngredients(ingredients);

    this.store.dispatch(new ShoppingListActions.AddIngredients(ingredients));


  }

  getRecipeById(index: number): Recipe {
    return this.recipes[index];
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.updateRecipes();
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.updateRecipes();
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }
}
