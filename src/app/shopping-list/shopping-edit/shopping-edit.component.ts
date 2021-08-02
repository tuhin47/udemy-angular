import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Ingredient} from "../../shared/ingredient.model";
import {ShoppingListService} from "../shopping-list.service";
import {NgForm} from "@angular/forms";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit,OnDestroy {
  @ViewChild('f') slForm: NgForm;
  private subscription: Subscription;
  private editedItemIndex: number;
  private editMode: boolean = false;
  private editItem: Ingredient;

  constructor(private slService: ShoppingListService) {
  }

  ngOnInit(): void {
    this.subscription = this.slService.startEditing
      .subscribe(
        (index:number) =>{
          this.editedItemIndex = index;
          this.editMode = true;
          this.editItem = this.slService.getIngredient(index);
          this.slForm.setValue({
            name:this.editItem.name,
            amount: this.editItem.amount
          })
        }
      )
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onAddItem(form: NgForm) {
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);
    this.slService.addIngredient(newIngredient);
    // this.ingredientAdded.emit(newIngredient);
  }
}
