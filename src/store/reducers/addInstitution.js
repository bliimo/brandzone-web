import {
  ADD_INSTITUTION_REQUEST,
  ADD_INSTITUTION_FAILURE,
  ADD_INSTITUTION_SUCCESS
} from '../actions/actionTypes';

const initialState = {
  institution: [],
  error: ''
};

export default function(state = initialState, action) {
  switch (action.type) {
    case ADD_INSTITUTION_REQUEST:
      return {
        ...state,
        institution: [],
        isLoading: true,
        error: ''
      };
    case ADD_INSTITUTION_SUCCESS:
      return {
        ...state,
        institution: action.payload,
        isLoading: false,
        error: ''
      };
    case ADD_INSTITUTION_FAILURE:
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
