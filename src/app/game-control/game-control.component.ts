import {Component, OnInit, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-game-control',
  templateUrl: './game-control.component.html',
  styleUrls: ['./game-control.component.css']
})
export class GameControlComponent implements OnInit {
  @Output() gameEmitter = new EventEmitter<number>();

  game: number;

  constructor() {
  }

  ngOnInit(): void {
  }

  startGame() {
    let i = 1;
    this.game = setInterval(() => this.gameEmitter.emit(i++), 1000);
  }

  stopGame() {
    clearInterval(this.game);
  }
}
