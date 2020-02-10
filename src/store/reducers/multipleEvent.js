import {
  GET_MULTIPLE_EVENTS_REQUEST,
  GET_MULTIPLE_EVENTS_FAILURE,
  GET_MULTIPLE_EVENTS_SUCCESS
} from '../actions/actionTypes';

const initialState = {
  multiplEvents: [],
  error: ''
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_MULTIPLE_EVENTS_REQUEST:
      return {
        ...state,
        multiplEvents: [],
        isLoading: true,
        error: ''
      };
    case GET_MULTIPLE_EVENTS_SUCCESS:
      return {
        ...state,
        multiplEvents: action.payload,
        isLoading: false,
        error: ''
      };
    case GET_MULTIPLE_EVENTS_FAILURE:
      return {
        ...state,
        isLoading: false,
        multiplEvents: [],
        error: action.payload
      };
    default:
      return state;
  }
}
