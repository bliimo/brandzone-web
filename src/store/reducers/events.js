import { EVENTS_REQUEST, EVENTS_FAILURE, EVENTS_SUCCESS } from '../actions/actionTypes';

const initialState = {
  events: [],
  error: ''
};

export default function(state = initialState, action) {
  switch (action.type) {
    case EVENTS_REQUEST:
      return {
        ...state,
        events: [],
        isLoading: true,
        error: ''
      };
    case EVENTS_SUCCESS:
      return {
        ...state,
        events: action.payload,
        isLoading: false,
        error: ''
      };
    case EVENTS_FAILURE:
      return {
        ...state,
        isLoading: false,
        events: [],
        error: action.payload
      };
    default:
      return state;
  }
}
