import {Component, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthResponseData, AuthService} from "./auth.service";
import {finalize} from "rxjs/operators";
import {Observable} from "rxjs";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html'
})
export class AuthComponent implements OnInit {
  isLoginMode = true;
  isLoading = false;
  error: string;

  constructor(private authService: AuthService,
              private router: Router) {

  }

  ngOnInit(): void {
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(authForm: NgForm) {
    if (authForm.invalid) {
      return;
    }
    const email = authForm.value.email;
    const password = authForm.value.password;
    this.isLoading = true;

    let authObs: Observable<AuthResponseData>;
    if (this.isLoginMode) {
      authObs = this.authService.login(email, password);
    } else {
      authObs = this.authService.signUp(email, password);
    }
    authObs
      .pipe(
        finalize(() => {
          this.isLoading = false;
        }),
      )
      .subscribe(
        response => {
          console.log(response);
          this.router.navigate(['/recipes']);
        },
        error => {
          console.error(error)
          this.error = error;
        },
      )
    ;
    authForm.reset();
  }
}
