import {Component, Output, EventEmitter} from "@angular/core";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {
  @Output() featureEmit = new EventEmitter<string>();

  onListSelect(feature: string) {
    this.featureEmit.emit(feature);
  }
}
