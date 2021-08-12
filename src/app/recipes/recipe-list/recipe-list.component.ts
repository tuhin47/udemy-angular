import {Component, OnDestroy, OnInit} from '@angular/core';
import {Recipe} from "../recipe.model";
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription} from "rxjs";
import {AppState} from "../../store/app.reducer";
import {Store} from "@ngrx/store";
import {map} from "rxjs/operators";

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes: Recipe[];
  private subcription: Subscription;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private store: Store<AppState>) {

  }

  ngOnInit(): void {
    this.subcription = this.store.select('recipes')
      .pipe(map(recipeState => recipeState.recipes))
      .subscribe(
        recipes => this.recipes = recipes
      );
  }

  onNewRecipe() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }

  ngOnDestroy(): void {
    this.subcription.unsubscribe();
  }
}
