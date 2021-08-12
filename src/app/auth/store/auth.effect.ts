import {Actions, Effect, ofType} from "@ngrx/effects";
import * as AuthActions from "./auth.actions";
import {environment} from "../../../environments/environment";
import {catchError, map, switchMap} from "rxjs/operators";
import {HttpClient} from "@angular/common/http";
import {of} from "rxjs";
import {Inject, Injectable} from "@angular/core";


export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable()
export class AuthEffects {
  @Effect()
  authLogin = this.actions$.pipe(
    ofType(AuthActions.LOGIN_START),
    switchMap((authData: AuthActions.LoginStart) => {
      return this.http
        .post<AuthResponseData>(
          'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + environment.firebaseKeyAPI,
          {
            email: authData.payload.email,
            password: authData.payload.password,
            returnSecureToken: true
          }
        ).pipe(
          map(resData => {
            const expirationDate = new Date(new Date().getTime() + Number(resData.expiresIn) * 1000);
            return of(new AuthActions.Login({
              email: resData.email,
              userId: resData.localId,
              token: resData.idToken,
              expirationDate: expirationDate
            }));
          }),
          catchError(error => {
            return of();
          }),
        )
    })
  );

  constructor(private actions$: Actions,
              private http: HttpClient) {
  }
}
