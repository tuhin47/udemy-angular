import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-counter-actions',
  templateUrl: './counter-actions.component.html',
  styleUrls: ['./counter-actions.component.css']
})
export class CounterActionsComponent implements OnInit {

  // @Input() onModify: (number: number) => void;
  @Output() onValueChange = new EventEmitter<{ value: number }>();
  @Output() onReset = new EventEmitter<void>();


  constructor() {
  }

  ngOnInit(): void {
  }

}
