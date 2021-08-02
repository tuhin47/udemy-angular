import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {RecipeService} from "../recipe.service";
import {Recipe} from "../recipe.model";

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  private id: number;
  editMode = false;
  recipeForm: FormGroup;
  amountValidators = [
    Validators.required,
    Validators.pattern(/^[1-9]+[0-9]*$/)
  ];

  constructor(private route: ActivatedRoute,
              private router: Router,
              private recipeService: RecipeService) {

  }

  ngOnInit(): void {
    this.initForm();
    this.route.params
      .subscribe(
        params => {
          this.id = +params['id'];
          this.editMode = params['id'] != null;
          this.initForm();
        }
      )
  }

  onSubmit() {
    const recipe = this.recipeForm.value;
    if (this.editMode) {
      this.recipeService.updateRecipe(this.id, recipe);
    } else {
      this.recipeService.addRecipe(recipe);
    }
    this.onCancel();
  }

  get controlArray() {
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }

  private initForm() {
    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription = '';
    let recipeIngredients = new FormArray([]);

    if (this.editMode) {
      const recipe = this.recipeService.getRecipeById(this.id);
      recipeName = recipe.name;
      recipeImagePath = recipe.imagePath;
      recipeDescription = recipe.description;
      if (recipe['ingredients']) {
        for (let ingredient of recipe['ingredients']) {
          recipeIngredients.push(
            new FormGroup({
                'name': new FormControl(ingredient.name,Validators.required),
                'amount': new FormControl(ingredient.amount,this.amountValidators)
              }
            )
          )
      }
    }
  }

  this.recipeForm = new FormGroup({
    'name': new FormControl(recipeName,Validators.required),
    'imagePath': new FormControl(recipeImagePath,Validators.required),
    'description': new FormControl(recipeDescription, Validators.required),
    'ingredients': recipeIngredients
  });
}

  onAddIngredient() {
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        name: new FormControl(null, Validators.required),
        amount: new FormControl(null, this.amountValidators)
      })
    )
  }

  onCancel() {
    this.router.navigate(['../'],{relativeTo: this.route})

  }

  onRemoveIngredient(index: number) {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }
}
