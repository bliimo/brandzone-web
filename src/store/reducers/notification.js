import {
  NOTIFICATION_REQUEST,
  NOTIFICATION_FAILURE,
  NOTIFICATION_SUCCESS
} from '../actions/actionTypes';

const initialState = {
  isLoading: false,
  notification: [],
  error: ''
};

export default function(state = initialState, action) {
  switch (action.type) {
    case NOTIFICATION_REQUEST:
      return {
        ...state,
        notification: [],
        isLoading: true,
        error: ''
      };
    case NOTIFICATION_SUCCESS:
      return {
        ...state,
        notification: action.payload,
        isLoading: false,
        error: ''
      };
    case NOTIFICATION_FAILURE:
      return {
        ...state,
        isLoading: false,
        notification: [],
        error: action.payload
      };
    default:
      return state;
  }
}
