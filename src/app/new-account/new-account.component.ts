import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {LoggingService} from "../logging.service";
import {AccountService} from "../account.service";

@Component({
  selector: 'app-new-account',
  templateUrl: './new-account.component.html',
  styleUrls: ['./new-account.component.css'],
  // providers: [LoggingService]
})
export class NewAccountComponent implements OnInit{
  @Output() accountAdded = new EventEmitter<{ name: string, status: string }>();

  constructor(private loggingService: LoggingService, private accountService: AccountService) {
  }


  ngOnInit(): void {
    this.accountService.statusChangeAlert.subscribe(
      (status) => alert("Updated Status " + status)
    );
  }

  onCreateAccount(accountName: string, accountStatus: string) {
    this.accountService.addAccount(accountName, accountStatus);
    // this.loggingService.logStatusChange(accountStatus);
  }
}
