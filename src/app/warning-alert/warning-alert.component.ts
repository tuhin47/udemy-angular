import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-warning-alert',
  template:`
  <p> This is Warning</p>
  `,
  styles:[
    `
      p{
        padding: 20px;
        background-color: lightgoldenrodyellow;
        border: 1px solid  yellow ;
      }
    `
  ]
})
export class WarningAlertComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
