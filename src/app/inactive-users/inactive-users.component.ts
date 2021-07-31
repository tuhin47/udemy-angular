import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {UserService} from "../user.service";
import {CounterService} from "../counter.service";

@Component({
  selector: 'app-inactive-users',
  templateUrl: './inactive-users.component.html',
  styleUrls: ['./inactive-users.component.css'],
  providers: [CounterService]
})
export class InactiveUsersComponent implements OnInit{
  users: string[];

  constructor(private userService: UserService,
              private counterService:CounterService) {
  }
  onSetToActive(id: number) {
    this.userService.onSetToActive(id);
    this.counterService.countActions('inactive->active');
  }

  ngOnInit(): void {
    this.users = this.userService.inactiveUsers;
  }
}
