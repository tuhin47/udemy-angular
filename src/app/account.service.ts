import {LoggingService} from "./logging.service";
import {Injectable} from "@angular/core";
import { EventEmitter } from "@angular/core";

@Injectable()
export class AccountService {
  accounts = [
    {
      name: 'Master Account',
      status: 'active'
    },
    {
      name: 'Testaccount',
      status: 'inactive'
    },
    {
      name: 'Hidden Account',
      status: 'unknown'
    }
  ];

  constructor(private loggingService: LoggingService) {
  }

  statusChangeAlert = new EventEmitter<string>();

  addAccount(name: string, status: string) {
    this.accounts.push({
      name,
      status
    })
    this.loggingService.logStatusChange(status);
  }

  updateAccount(id: number, status: string) {
    this.accounts[id].status = status;
    this.loggingService.logStatusChange(status);
  }
}
