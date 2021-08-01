import {Component, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('f') signUpForm: NgForm;

  suggestUserName() {
    const suggestedName = 'Superuser';

    this.signUpForm.form.patchValue({
      userData:{
        username: suggestedName
      }
    });
  }

  /*onSubmit(form: NgForm) {
    console.log(form);
  }*/
  defaultQuestion = 'pet';
  answer: string = 'default';
  genders = ['Male', 'Female'];

  onSubmit() {
    console.log(this.signUpForm);
    this.signUpForm.resetForm();
  }
}
