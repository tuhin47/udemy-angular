import {HttpClient} from "@angular/common/http";
import {Actions, Effect, ofType} from "@ngrx/effects";
import {map, switchMap} from "rxjs/operators";
import {Recipe} from "../recipe.model";
import * as RecipeActions from "./recipe.actions";
import {Injectable} from "@angular/core";


@Injectable()
export class RecipeEffects {
  @Effect()
  fetchRecipes = this.actions$.pipe(
    ofType(RecipeActions.FETCH_RECIPES),
    switchMap(() => {
      return this.http.get<Recipe[]>('https://udemy-angular-b1e4c-default-rtdb.asia-southeast1.firebasedatabase.app/recipes.json')
    }),
    map(recipes => {
      return recipes.map(r => {
        return {
          ingredients: [],
          ...r
        }
      });
    }),
    map(recipes => new RecipeActions.SetRecipes(recipes))
  );


  constructor(private actions$: Actions,
              private http: HttpClient) {


  }
}
