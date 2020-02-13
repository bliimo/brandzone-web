import { REPORT_REQUEST, REPORT_FAILURE, REPORT_SUCCESS } from '../actions/actionTypes';

const initialState = {
  reports: {},
  error: ''
};

export default function(state = initialState, action) {
  switch (action.type) {
    case REPORT_REQUEST:
      return {
        ...state,
        reports: {},
        isLoading: true,
        error: ''
      };
    case REPORT_SUCCESS:
      return {
        ...state,
        reports: action.payload,
        isLoading: false,
        error: ''
      };
    case REPORT_FAILURE:
      return {
        ...state,
        isLoading: false,
        reports: {},
        error: action.payload
      };
    default:
      return state;
  }
}
