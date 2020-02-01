import {
  INSTITUTION_REQUEST,
  INSTITUTION_FAILURE,
  INSTITUTION_SUCCESS
} from '../actions/actionTypes';

const initialState = {
  institution: [],
  error: ''
};

export default function(state = initialState, action) {
  switch (action.type) {
    case INSTITUTION_REQUEST:
      return {
        ...state,
        institution: [],
        isLoading: true,
        error: ''
      };
    case INSTITUTION_SUCCESS:
      return {
        ...state,
        institution: action.payload,
        isLoading: false,
        error: ''
      };
    case INSTITUTION_FAILURE:
      return {
        ...state,
        isLoading: false,
        institution: [],
        error: action.payload
      };
    default:
      return state;
  }
}
