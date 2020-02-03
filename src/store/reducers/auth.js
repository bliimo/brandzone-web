import {
  LOGIN_REQUEST,
  LOGIN_FAILURE,
  LOGIN_SUCCESS,
  SET_LOGGEDIN_USER,
  SET_CURRENT_USER
} from '../actions/actionTypes';

const initialState = {
  isLoading: false,
  isAuthenticated: false,
  user: null,
  currentUser: null,
  error: ''
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: Object.keys(action.payload).length > 0,
        user: action.payload
      };
    case LOGIN_REQUEST:
      return { ...state, isLoading: true, error: '' };
    case LOGIN_SUCCESS:
      return { ...state, isLoading: false, currentUser: action.payload, isAuthenticated: true };
    case LOGIN_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };
    default:
      return state;
  }
}
