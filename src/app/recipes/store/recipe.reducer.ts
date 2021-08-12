import {Recipe} from "../recipe.model";
import {
  ADD_RECIPE,
  AddRecipe, DELETE_RECIPE, DeleteRecipe,
  FETCH_RECIPES,
  RecipeActions,
  SET_RECIPES,
  SetRecipes,
  UPDATE_RECIPE, UpdateRecipe
} from "./recipe.actions";


export interface State {
  recipes: Recipe[];
}

const initialState: State = {
  recipes: []
};

export function recipeReducer(state = initialState, action: RecipeActions):State {
  switch (action.type) {
    case SET_RECIPES:
      if (action instanceof SetRecipes) {
        return {
          ...state,
          recipes: [...action.payload]
        };
      }
      return state;
    case ADD_RECIPE:
      if (action instanceof AddRecipe) {
        return {
          ...state,
          recipes: [...state.recipes, action.payload]
        };
      }
      return state;
    case UPDATE_RECIPE:
      if (action instanceof UpdateRecipe) {
        const updatedRecipe = {
          ...state.recipes[action.payload.index],
          ...action.payload.newRecipe
        };
        const updatedRecipes = [...state.recipes];
        updatedRecipes[action.payload.index] = updatedRecipe;
        return {
          ...state,
          recipes: updatedRecipes
        }
      }
      return state;
    case DELETE_RECIPE:
      if (action instanceof DeleteRecipe) {
        return {
          ...state,
          recipes: state.recipes.filter((_, i) => i !== action.payload)
        }
      }
      return state;
    case FETCH_RECIPES:
      return state;


  }
  return state;
}
