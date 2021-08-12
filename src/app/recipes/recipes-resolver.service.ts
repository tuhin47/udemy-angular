import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Recipe} from "./recipe.model";
import {Observable, of} from "rxjs";
import {DataStorageService} from "../shared/data-storage.service";
import {RecipeService} from "./recipe.service";
import {Store} from "@ngrx/store";
import {AppState} from "../store/app.reducer";
import * as RecipeActions from "./store/recipe.actions";
import {Actions, ofType} from "@ngrx/effects";
import {map, switchMap, take} from "rxjs/operators";

@Injectable({providedIn: "root"})
export class RecipesResolverService implements Resolve<Recipe[]> {

  constructor(
    private store: Store<AppState>,
    private recipeService: RecipeService,
    private actions$: Actions) {

  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Recipe[]> | Promise<Recipe[]> | Recipe[] {
    return this.store.select('recipes')
      .pipe(
        take(1),
        map(recipeState => recipeState.recipes),
        switchMap(recipes => {
          if (recipes.length === 0) {
            this.store.dispatch(new RecipeActions.FetchRecipes());
            return this.actions$.pipe(
              ofType(RecipeActions.SET_RECIPES),
              take(1)
            );
          } else {
            return of(recipes);
          }
        })
      );

  }


}
