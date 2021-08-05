import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {AppComponent} from './app.component';
import {HeaderComponent} from "./header/header.component";
import {ShoppingListService} from "./shopping-list/shopping-list.service";
import {AppRoutingModule} from "./app-routing.module";
import {RecipeService} from "./recipes/recipe.service";
import {AuthComponent} from './auth/auth.component';
import {AuthInterceptorService} from "./auth/auth-interceptor.service";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {GlobalConfig, ToastrModule} from "ngx-toastr";
import {RecipesModule} from "./recipes/recipes.module";
import {ShoppingListModule} from "./shopping-list/shopping-list.module";

const toasterConfig: Partial<GlobalConfig> = {
  positionClass: 'toast-top-right',
  progressBar: true,
  closeButton: true,
};

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AuthComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    RecipesModule,
    ShoppingListModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(toasterConfig)
  ],
  providers: [ShoppingListService, RecipeService, {
    provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true
  }],
  bootstrap: [AppComponent]
  /*,
  entryComponents:[
    AlertComponent // angular 9 or lower
  ]*/
})
export class AppModule {
}
