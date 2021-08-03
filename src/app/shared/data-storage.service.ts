import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {RecipeService} from "../recipes/recipe.service";
import {Recipe} from "../recipes/recipe.model";
import {map} from "rxjs/operators";

@Injectable({providedIn: 'root'})
export class DataStorageService {
  constructor(private http: HttpClient, private recipeService: RecipeService) {

  }

  storeRecipes() {
    const recipes = this.recipeService.getRecipes();
    this.http.put('https://udemy-angular-b1e4c-default-rtdb.asia-southeast1.firebasedatabase.app/recipes.json', recipes)
      .subscribe(response => console.log(response));
  }

  fetchRecipes() {
    this.http.get<Recipe[]>('https://udemy-angular-b1e4c-default-rtdb.asia-southeast1.firebasedatabase.app/recipes.json')
      .pipe(
        map(recipes => {
          return recipes.map(r => {
            return {
              ingredients: [],
              ...r
            }
          });
        })
      )
      .subscribe(response => {
        this.recipeService.setRecipes(response);
      });
  }
}
