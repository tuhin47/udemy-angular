import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Ingredient} from "../../shared/ingredient.model";
import {ShoppingListService} from "../shopping-list.service";

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild('nameInput', {static: true}) nameInputRef: ElementRef;
  @ViewChild('amountInput', {static: true}) amountInputRef: ElementRef;

  constructor(private slService: ShoppingListService) {
  }

  ngOnInit(): void {
  }

  onAddItem() {
    const name = this.nameInputRef.nativeElement.value
    const amount = this.amountInputRef.nativeElement.value
    const newIngredient = new Ingredient(name, amount);
    this.slService.addIngredient(newIngredient);
    // this.ingredientAdded.emit(newIngredient);
  }
}
