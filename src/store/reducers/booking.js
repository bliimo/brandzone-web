import { get } from 'lodash';
import { BOOKING_REQUEST, BOOKING_FAILURE, BOOKING_SUCCESS } from '../actions/actionTypes';

const initialState = {
  isRequestingBooking: false,
  isGetBooking: false,
  hasError: false,
  error: {},
  payload: {}
};

const booking = (state = initialState, action) => {
  switch (action.type) {
    case BOOKING_REQUEST:
      return {
        ...state,
        isGetBooking: false,
        isRequestingBooking: true,
        hasError: false
      };
    case BOOKING_FAILURE:
      return {
        ...state,
        isGetBooking: false,
        isRequestingBooking: false,
        hasError: true,
        payload: get(action, 'payload')
      };
    case BOOKING_SUCCESS:
      return {
        ...state,
        isGetBooking: true,
        isRequestingBooking: false,
        payload: get(action, 'payload')
      };

    default:
      return state;
  }
};

export default booking;
