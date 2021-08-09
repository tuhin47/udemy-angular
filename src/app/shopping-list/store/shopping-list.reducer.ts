import {Ingredient} from "../../shared/ingredient.model";
import * as ShoppingListActions from "./shopping-list.actions";

export interface State {
  ingredients: Ingredient[];
  editedIngredient: Ingredient;
  editedIngredientIndex: number;
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
  state: State = initialState,
  action: ShoppingListActions.ShoppingListActions
){
  switch (action.type) {
    case ShoppingListActions.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: [...state.ingredients, action.payload as Ingredient]
      };
    case ShoppingListActions.ADD_INGREDIENTS:
      return {
        ...state,
        ingredients: [...state.ingredients, ...action.payload as Ingredient[]]
      }
    case ShoppingListActions.UPDATE_INGREDIENT:
      const ingredient = state.ingredients[state.editedIngredientIndex];
      const updatedIngredient ={
        ...ingredient,
        ...action.payload
      }
      const updatedIngredients :Ingredient[]= [...state.ingredients];
      updatedIngredients[state.editedIngredientIndex] = updatedIngredient;
      return {
        ...state,
        ingredients: updatedIngredients
      }
    case ShoppingListActions.DELETE_INGREDIENT:
      return {
        ...state,
        ingredients: state.ingredients.filter((ing, index) => index != state.editedIngredientIndex)
      }
    case ShoppingListActions.START_EDIT:
      const editedIngredientIndex = action.payload as number;
      return {
        ...state,
        editedIngredientIndex: editedIngredientIndex,
        editedIngredient: {
          ...state.ingredients[editedIngredientIndex]
        }
      }
    case ShoppingListActions.STOP_EDIT:
      return{
        ...state,
        editedIngredient:null,
        editedIngredientIndex: -1
      }
    default:
      return state;
  }
}
