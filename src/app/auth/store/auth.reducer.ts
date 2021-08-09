import {User} from '../user.model';
import {AuthActions, Login, LOGIN, LOGOUT} from "./auth.actions";

export interface State {
  user: User;
}

const initialState: State = {
  user: null
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
  }
  return state;
}
