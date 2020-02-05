import {
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILURE
} from '../actions/actionTypes';

const initialState = {
  isLoading: false,
  user: null,
  error: ''
};

export default function(state = initialState, action) {
  switch (action.type) {
    case UPDATE_USER_REQUEST:
      return { ...state, isLoading: true, error: '' };
    case UPDATE_USER_SUCCESS:
      return { ...state, isLoading: false, user: action.payload };
    case UPDATE_USER_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };
    default:
      return state;
  }
}
