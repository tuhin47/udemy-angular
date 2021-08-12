import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {RecipeService} from "../recipes/recipe.service";
import {Recipe} from "../recipes/recipe.model";
import {map, tap} from "rxjs/operators";
import {AppState} from "../store/app.reducer";
import {Store} from "@ngrx/store";

import * as RecipeActions from "../recipes/store/recipe.actions";

@Injectable({providedIn: 'root'})
export class DataStorageService {
  constructor(private http: HttpClient,
              private recipeService: RecipeService,
              private store: Store<AppState>) {
  }

  storeRecipes() {
    const recipes = this.recipeService.getRecipes();
    this.http.put('https://udemy-angular-b1e4c-default-rtdb.asia-southeast1.firebasedatabase.app/recipes.json', recipes)
      .subscribe(response => console.log(response));
  }

  fetchRecipes() {
    return this.http.get<Recipe[]>('https://udemy-angular-b1e4c-default-rtdb.asia-southeast1.firebasedatabase.app/recipes.json')
      .pipe(
        map(recipes => {
          return recipes.map(r => {
            return {
              ingredients: [],
              ...r
            }
          });
        }),
        tap(recipes => {
          // this.recipeService.setRecipes(recipes);
          this.store.dispatch(new RecipeActions.SetRecipes(recipes));
        })
      )
  }
}
