import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {RecipesComponent} from "./app/recipes/recipes.component";
import {ShoppingListComponent} from "./app/shopping-list/shopping-list.component";
import {RecipeStartComponent} from "./app/recipes/recipe-start/recipe-start.component";
import {RecipeDetailComponent} from "./app/recipes/recipe-detail/recipe-detail.component";
import {RecipeEditComponent} from "./app/recipes/recipe-edit/recipe-edit.component";
import {RecipesResolverService} from "./app/recipes/recipes-resolver.service";
import {AuthComponent} from "./app/auth/auth.component";

const appRoutes: Routes = [
  {path: '', redirectTo: '/recipes', pathMatch: 'full'},
  {
    path: 'recipes', component: RecipesComponent, children: [
      {path: '', component: RecipeStartComponent},
      {path: 'new', component: RecipeEditComponent},
      {path: ':id', component: RecipeDetailComponent, resolve: [RecipesResolverService]},
      {path: ':id/edit', component: RecipeEditComponent, resolve: [RecipesResolverService]},
    ]
  },
  {path: 'shopping-list', component: ShoppingListComponent},
  {path: 'auth', component: AuthComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
