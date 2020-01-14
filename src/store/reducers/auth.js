import { get } from 'lodash';
import {
  LOGIN_REQUEST,
  LOGIN_FAILURE,
  LOGIN_SUCCESS,
  LOGOUT,
} from '../actions/actionTypes';

const initialState = {
  isLoggingIn: false,
  isLoggedIn: false,
  hasError: false,
  error: {},
  payload: {},
};

const auth = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        isLoggedIn: false,
        isLoggingIn: true,
        hasError: false,
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        isLoggedIn: false,
        isLoggingIn: false,
        hasError: true,
        payload: get(action, 'payload'),
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        isLoggingIn: false,
        payload: get(action, 'payload'),
      };

    case LOGOUT:
      return {
        ...initialState,
      };

    default:
      return state;
  }
};

export default auth;
