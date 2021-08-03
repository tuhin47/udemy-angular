import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {catchError} from "rxjs/operators";
import {get} from "lodash";
import {throwError} from "rxjs";

interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiredIn: string;
  localId: string;
}

@Injectable({providedIn: "root"})
export class AuthService {
  constructor(private http: HttpClient) {


  }

  signUp(email: string, password: string) {
    return this.http.post<AuthResponseData>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyA9c6uqp2igOXdjMf4CcCzwtRH6b1lcIXY',
      {
        email,
        password,
        returnSecureToken: true
      }
    )
      .pipe(
        catchError(err => {
          let errorMessage = 'An unknown error occurred!';
          const message = get(err, 'error.error.message');
          if (!message) {
            return throwError(errorMessage);
          }
          switch (message) {
            case 'EMAIL_EXISTS':
              errorMessage = 'This email already exits!';
              break;
          }
          return throwError(errorMessage);
        })
      )
  }
}
