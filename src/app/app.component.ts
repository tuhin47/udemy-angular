import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  projectForm: FormGroup;
  projectStatus = ['Stable', 'Critical', 'Finished'];

  ngOnInit(): void {
    this.projectForm = new FormGroup({
      'projectName': new FormControl(null,
        [Validators.required, this.forbiddenProjectName.bind(this)],
        this.forbiddenProjectNameAsync.bind(this)),
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'status': new FormControl(null)
    });
  }

  onSubmit() {
    console.log(this.projectForm);
    console.log(this.projectForm.value);
  }

  forbiddenProjectName(control: FormControl) {
    if (control.value === 'Test') {
      return {'forbiddenSync': true}
    }
  }

  forbiddenProjectNameAsync(control: FormControl) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (control.value && control.value.includes('test')) {
          resolve({'forbiddenAsync': true})
        }
      }, 1500)
    })
  }

}
