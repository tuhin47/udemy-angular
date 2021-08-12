import {User} from '../user.model';
import {AuthActions, AuthenticateSuccess, AUTHENTICATE_SUCCESS, AUTHENTICATE_FAIL, LOGIN_START, AuthenticateFail, LOGOUT} from "./auth.actions";

export interface State {
  user: User;
  authError: string;
  loading: boolean;
}

const initialState: State = {
  user: null,
  authError: null,
  loading: false
};

export function authReducer(
  state = initialState,
  action: AuthActions): State {
  switch (action.type) {
    case AUTHENTICATE_SUCCESS:
      if (action instanceof AuthenticateSuccess) {
        const user = new User(
          action.payload.email,
          action.payload.userId,
          action.payload.token,
          action.payload.expirationDate);
        return {
          ...state,
          user: user
        }
      }
      break;
    case LOGOUT:
      return {
        ...state,
        user: null
      };
    case LOGIN_START:
      return {
        ...state,
        authError: null,
        loading:true,
      };
    case AUTHENTICATE_FAIL:
      if (action instanceof AuthenticateFail) {
        return {
          ...state,
          authError: action.payload,
          loading:false
        };
      }
  }
  return state;
}
