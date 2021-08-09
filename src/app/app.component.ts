import {Component, OnInit} from '@angular/core';
import {LoggingService} from "./logging.service";
import {AuthService} from "./auth/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private loggingService: LoggingService,
              private authService: AuthService) {

  }

  ngOnInit(): void {
    this.authService.autoLogin();
    this.loggingService.printLog("App-Component");
  }
}
