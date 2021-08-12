import {User} from '../user.model';
import {AuthActions, Login, LOGIN, LOGIN_FAIL, LOGIN_START, LoginFail, LOGOUT} from "./auth.actions";

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
    case LOGIN:
      if (action instanceof Login) {
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
    case LOGIN_FAIL:
      if (action instanceof LoginFail) {
        return {
          ...state,
          authError: action.payload,
          loading:false
        };
      }
  }
  return state;
}
