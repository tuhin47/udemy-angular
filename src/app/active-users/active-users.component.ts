import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {UserService} from "../user.service";
import {CounterService} from "../counter.service";

@Component({
  selector: 'app-active-users',
  templateUrl: './active-users.component.html',
  styleUrls: ['./active-users.component.css'],
  providers: [CounterService]
})
export class ActiveUsersComponent implements OnInit {
  users: string[];

  constructor(private userService: UserService, private counterService: CounterService) {

  }

  onSetToInactive(id: number) {
    this.userService.onSetToInactive(id);
    this.counterService.countActions('Active->InActive');
  }

  ngOnInit(): void {
    this.users = this.userService.activeUsers;
  }
}
