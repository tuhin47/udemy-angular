import {Ingredient} from "../../shared/ingredient.model";
import * as ShoppingListActions from "./shopping-list.actions";

export interface State {
  ingredients: Ingredient[];
  editedIngredient: Ingredient;
  editedIngredientIndex: number;
}

export interface AppState{
  shoppingList: State;
}

const initialState: State = {
  ingredients: [
    new Ingredient('apples', 5),
    new Ingredient('tomatoes', 10),
  ],
  editedIngredient: null,
  editedIngredientIndex: -1
};

export function shoppingListReducer(
  state:State = initialState,
  action: ShoppingListActions.ShoppingListActions
) {
  switch (action.type) {
    case ShoppingListActions.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: [...state.ingredients, action.payload]
      };
    case ShoppingListActions.ADD_INGREDIENTS:
      return {
        ...state,
        ingredients: [...state.ingredients, ...action.payload as Ingredient[]]
      }
    case ShoppingListActions.UPDATE_INGREDIENT:
      let ingredients = state.ingredients;
      const payload = action.payload as { index: number, ingredient: Ingredient; };
      ingredients[payload.index] = payload.ingredient;
      return {
        ...state,
        ingredients: ingredients
      }
    case ShoppingListActions.DELETE_INGREDIENT:
      return {
        ...state,
        ingredients: state.ingredients.splice(action.payload as number, 1)
      }
    default:
      return state;
  }
}
