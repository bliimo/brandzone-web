import { BOOKING_REQUEST, BOOKING_SUCCESS, BOOKING_FAILURE } from '../actions/actionTypes';

const initialState = {
  isLoading: false,
  booking: null,
  error: ''
};

export default function(state = initialState, action) {
  switch (action.type) {
    case BOOKING_REQUEST:
      return { ...state, isLoading: true, error: '' };
    case BOOKING_SUCCESS:
      return { ...state, isLoading: false, booking: action.payload };
    case BOOKING_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };
    default:
      return state;
  }
}
