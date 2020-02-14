import {
  PASSWORD_UPDATE_REQUEST,
  PASSWORD_UPDATE_FAILURE,
  PASSWORD_UPDATE_SUCCESS
} from '../actions/actionTypes';

const initialState = {
  password: {},
  error: '',
  isLoading: ''
};

export default function(state = initialState, action) {
  switch (action.type) {
    case PASSWORD_UPDATE_REQUEST:
      return {
        ...state,
        password: {},
        isLoading: true,
        error: ''
      };
    case PASSWORD_UPDATE_SUCCESS:
      return {
        ...state,
        password: action.payload,
        isLoading: false,
        error: ''
      };
    case PASSWORD_UPDATE_FAILURE:
      return {
        ...state,
        isLoading: false,
        password: {},
        error: action.payload
      };
    default:
      return state;
  }
}
