import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from "@angular/common/http";
import {AppComponent} from './app.component';
import {HeaderComponent} from "./header/header.component";
import {AppRoutingModule} from "./app-routing.module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {GlobalConfig, ToastrModule} from "ngx-toastr";
import {RecipesModule} from "./recipes/recipes.module";
import {ShoppingListModule} from "./shopping-list/shopping-list.module";
import {MyCoreModule} from "./my-core.module";
import {AuthModule} from "./auth/auth.module";

const toasterConfig: Partial<GlobalConfig> = {
  positionClass: 'toast-top-right',
  progressBar: true,
  closeButton: true,
};

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RecipesModule,
    ShoppingListModule,
    MyCoreModule,
    AuthModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(toasterConfig)
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
