import {
  NOTIFICATION_REQUEST,
  NOTIFICATION_FAILURE,
  NOTIFICATION_SUCCESS,
  VIEW_NOTIFICATION_REQUEST,
  VIEW_NOTIFICATION_SUCCESS,
  VIEW_NOTIFICATION_FAILURE
} from '../actions/actionTypes';

const initialState = {
  isLoading: false,
  notification: [],
  notificationById: null,
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
    // View by id
    case VIEW_NOTIFICATION_REQUEST:
      return {
        ...state,
        notificationById: null,
        isLoading: true,
        error: ''
      };
    case VIEW_NOTIFICATION_SUCCESS:
      return {
        ...state,
        notificationById: action.payload,
        isLoading: false,
        error: ''
      };
    case VIEW_NOTIFICATION_FAILURE:
      return {
        ...state,
        isLoading: false,
        notificationById: {},
        error: action.payload
      };
    default:
      return state;
  }
}
