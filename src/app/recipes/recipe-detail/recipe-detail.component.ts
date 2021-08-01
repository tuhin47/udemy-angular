import {Component, OnInit} from '@angular/core';
import {Recipe} from "../recipe.model";
import {RecipeService} from "../recipe.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

 recipe: Recipe;

  constructor(private recipeService: RecipeService,
              private router:Router,
              private route:ActivatedRoute) {

  }

  ngOnInit(): void {
    this.route.params
      .subscribe(
        params => this.recipe = this.recipeService.getRecipeById(+params['id'])
      );
  }

  onAddToShoppingList() {
    this.recipeService.addIngredientToShoppingList(this.recipe.ingredients);
  }

  onEditRecipe() {
    this.router.navigate(['edit'],{relativeTo: this.route})
  }
}
