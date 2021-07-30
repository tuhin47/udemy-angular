import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.css']
})
export class CounterComponent implements OnInit {
  count: number = 0;

  constructor() {
  }

  ngOnInit(): void {
  }

  onReset() {
    this.count = 0;
  }

  onModify(data: { value: number }) {
    this.count += data.value
  }
}
