import {Action} from "@ngrx/store";
import {Recipe} from "../recipe.model";

export const SET_RECIPES = '[Recipes] Set Recipes';
export const FETCH_RECIPES = "[Recipes] Fetch Recipes";

export class SetRecipes implements Action {
  type: string = SET_RECIPES;

  constructor(public payload: Recipe[]) {

  }
}

export class FetchRecipes implements Action {
  type: string = FETCH_RECIPES;
}

export type RecipeActions = SetRecipes;


