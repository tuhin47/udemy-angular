import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Ingredient} from "../../shared/ingredient.model";
import {ShoppingListService} from "../shopping-list.service";
import {NgForm} from "@angular/forms";
import {Subscription} from "rxjs";
import {Store} from '@ngrx/store';
import * as ShoppingListActions from '../store/shopping-list.actions';
import * as fromShoppingList from "../store/shopping-list.reducer";

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f') slForm: NgForm;
  private subscription: Subscription;
  editedItemIndex: number;
  editMode: boolean = false;
  editItem: Ingredient;

  constructor(private slService: ShoppingListService,
              private store: Store<fromShoppingList.AppState>) {

  }

  ngOnInit(): void {
    this.subscription = this.slService.startEditing
      .subscribe(
        (index: number) => {
          this.editedItemIndex = index;
          this.editMode = true;
          this.editItem = this.slService.getIngredient(index);
          this.slForm.setValue({
            name: this.editItem.name,
            amount: this.editItem.amount
          })
        }
      )
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);
    if (this.editMode) {
      // this.slService.updateIngredient(this.editedItemIndex, newIngredient);
      this.store.dispatch(new ShoppingListActions.UpdateIngredient({
          index: this.editedItemIndex,
          ingredient: newIngredient
        }
      ))
    } else {
      // this.slService.addIngredient(newIngredient);
      this.store.dispatch(new ShoppingListActions.AddIngredient(newIngredient));

    }
    this.onClear();
  }

  onClear() {
    this.editMode = false;
    this.slForm.reset();
  }

  onDelete() {
    if (this.editMode) {
      // this.slService.deleteIngredient(this.editedItemIndex);
      this.store.dispatch(new ShoppingListActions.DeleteIngredient(this.editedItemIndex));
      this.onClear();
    }
  }
}
