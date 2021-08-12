import {Action} from "@ngrx/store";

export let SIGNUP_START = "[Auth] Signup Start";
export const LOGIN_START = '[Auth] Login Start';
export const AUTHENTICATE_FAIL = '[Auth] Login Failure';
export const AUTHENTICATE_SUCCESS = '[Auth] Login';
export const CLEAR_ERROR = "[Auth] Clear Error";
export const LOGOUT = '[Auth] Logout';

export class AuthenticateSuccess implements Action {
  readonly type: string = AUTHENTICATE_SUCCESS;

  constructor(public payload: {
    email: string;
    userId: string;
    token: string;
    expirationDate: Date;
  }) {
  }
}

export class Logout implements Action {
  readonly type: string = LOGOUT;
}

export class LoginStart implements Action {
  readonly type = LOGIN_START;

  constructor(public payload: {
    email: string;
    password: string;
  }) {
  }
}

export class AuthenticateFail implements Action {
  type: string = AUTHENTICATE_FAIL;

  constructor(public payload: string) {
  }
}

export class SignupStart implements Action {
  type: string = SIGNUP_START;

  constructor(public payload: {
    email: string;
    password: string;
  }) {
  }
}

export class ClearError implements Action {
  type: string = CLEAR_ERROR;

}

export type AuthActions = AuthenticateSuccess | Logout | LoginStart | AuthenticateFail | SignupStart | ClearError;
