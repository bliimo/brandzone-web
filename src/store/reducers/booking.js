import {
  BOOKING_REQUEST,
  BOOKING_SUCCESS,
  BOOKING_FAILURE,
  ADD_BOOKING_REQUEST,
  ADD_BOOKING_SUCCESS,
  ADD_BOOKING_FAILURE,
  ADD_BOOKING_NOTES_REQUEST,
  ADD_BOOKING_NOTES_SUCCESS,
  ADD_BOOKING_NOTES_FAILURE
} from '../actions/actionTypes';

const initialState = {
  isLoading: false,
  booking: null,
  error: ''
};

export default function(state = initialState, action) {
  switch (action.type) {
    case ADD_BOOKING_REQUEST:
    case ADD_BOOKING_NOTES_REQUEST:
    case BOOKING_REQUEST:
      return { ...state, isLoading: true, error: '' };

    case ADD_BOOKING_NOTES_SUCCESS:
    case ADD_BOOKING_SUCCESS:
    case BOOKING_SUCCESS:
      return { ...state, isLoading: false, booking: action.payload };

    case ADD_BOOKING_NOTES_FAILURE:
    case ADD_BOOKING_FAILURE:
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
