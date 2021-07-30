import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-counter-view',
  templateUrl: './counter-view.component.html',
  styleUrls: ['./counter-view.component.css']
})
export class CounterViewComponent implements OnInit {

  @Input('counter') count: number;

  constructor() {
  }

  ngOnInit(): void {
  }

}
