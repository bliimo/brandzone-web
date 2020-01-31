import { get } from 'lodash';
import { EVENTS_REQUEST, EVENTS_FAILURE, EVENTS_SUCCESS } from '../actions/actionTypes';

const initialState = {
  isRequestingEvent: false,
  isGetEvents: false,
  hasError: false,
  error: {},
  payload: {}
};

const events = (state = initialState, action) => {
  switch (action.type) {
    case EVENTS_REQUEST:
      return {
        ...state,
        isGetEvents: false,
        isRequestingEvent: true,
        hasError: false
      };
    case EVENTS_FAILURE:
      return {
        ...state,
        isGetEvents: false,
        isRequestingEvent: false,
        hasError: true,
        payload: get(action, 'payload')
      };
    case EVENTS_SUCCESS:
      return {
        ...state,
        isGetEvents: true,
        isRequestingEvent: false,
        payload: get(action, 'payload')
      };

    default:
      return state;
  }
};

export default events;
