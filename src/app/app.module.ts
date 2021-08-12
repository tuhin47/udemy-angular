import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from "@angular/common/http";
import {AppComponent} from './app.component';
import {HeaderComponent} from "./header/header.component";
import {AppRoutingModule} from "./app-routing.module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {GlobalConfig, ToastrModule} from "ngx-toastr";
import {MyCoreModule} from "./my-core.module";
import {StoreModule} from '@ngrx/store';
import {SharedModule} from "./shared/shared.module";
import * as fromApp from "./store/app.reducer";
import {EffectsModule} from '@ngrx/effects';
import {AuthEffects} from "./auth/store/auth.effect";
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {environment} from '../environments/environment';
import {StoreRouterConnectingModule} from '@ngrx/router-store';
import {RecipeEffects} from "./recipes/store/recipe.effects";


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
    MyCoreModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(toasterConfig),
    StoreModule.forRoot(fromApp.appReducer),
    SharedModule,
    EffectsModule.forRoot([AuthEffects, RecipeEffects]),
    StoreDevtoolsModule.instrument({maxAge: 25, logOnly: environment.production}),
    StoreRouterConnectingModule.forRoot()
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
