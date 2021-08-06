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
import {shoppingListReducer} from "./shopping-list/store/shopping-list.reducer";

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
    StoreModule.forRoot({shoppingList: shoppingListReducer}, {})
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
