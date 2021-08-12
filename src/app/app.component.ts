import {Component, OnInit} from '@angular/core';
import {LoggingService} from "./logging.service";
import {AuthService} from "./auth/auth.service";
import {AppState} from "./store/app.reducer";
import {Store} from "@ngrx/store";
import * as AuthActions from "./auth/store/auth.actions";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private loggingService: LoggingService,
              private authService: AuthService,
              private store: Store<AppState>
  ) {


  }

  ngOnInit(): void {
    // this.authService.autoLogin();
    this.store.dispatch(new AuthActions.AutoLogin());
    this.loggingService.printLog("App-Component");
  }
}
