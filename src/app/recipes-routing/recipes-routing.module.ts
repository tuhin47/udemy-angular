import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {RecipesComponent} from "../recipes/recipes.component";
import {RecipeStartComponent} from "../recipes/recipe-start/recipe-start.component";
import {RecipeEditComponent} from "../recipes/recipe-edit/recipe-edit.component";
import {RecipeDetailComponent} from "../recipes/recipe-detail/recipe-detail.component";
import {RecipesResolverService} from "../recipes/recipes-resolver.service";

const routes: Routes = [
  {
    path: 'recipes', component: RecipesComponent, children: [
      {path: '', component: RecipeStartComponent},
      {path: 'new', component: RecipeEditComponent},
      {path: ':id', component: RecipeDetailComponent, resolve: [RecipesResolverService]},
      {path: ':id/edit', component: RecipeEditComponent, resolve: [RecipesResolverService]},
    ]
  },
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class RecipesRoutingModule {
}
