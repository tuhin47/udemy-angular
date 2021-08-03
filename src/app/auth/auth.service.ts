import {Injectable} from "@angular/core";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {catchError, tap} from "rxjs/operators";
import {get} from "lodash";
import {Subject, throwError} from "rxjs";
import {User} from "./user.model";

export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiredIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({providedIn: "root"})
export class AuthService {

  user = new Subject<User>();

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
    ).pipe(
      catchError(AuthService.handleError),
      tap(this.handleAuthentication)
    );
  }

  login(email: string, password: string) {
    return this.http.post<AuthResponseData>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyA9c6uqp2igOXdjMf4CcCzwtRH6b1lcIXY',
      {
        email,
        password,
        returnSecureToken: true
      }
    ).pipe(
      catchError(AuthService.handleError),
      tap(this.handleAuthentication)
    );
  }

  private handleAuthentication(res: AuthResponseData) {
    const expirationData = new Date(new Date().getTime() + +res.expiredIn * 1000);
    const user = new User(res.email, res.localId, res.idToken, expirationData);
    this.user.next(user);
  }

  private static handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    const message = get(errorRes, 'error.error.message');
    if (!message) {
      return throwError(errorMessage);
    }
    switch (message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'This email already exits!';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = "Email does not exit";
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'Password Invalid';
        break;
    }
    return throwError(errorMessage);
  }

}
