import { UPLOAD_REQUEST, UPLOAD_FAILURE, UPLOAD_SUCCESS } from '../actions/actionTypes';

const initialState = {
  upload: {},
  error: ''
};

export default function(state = initialState, action) {
  switch (action.type) {
    case UPLOAD_REQUEST:
      return {
        ...state,
        upload: {},
        isLoading: true,
        error: ''
      };
    case UPLOAD_SUCCESS:
      return {
        ...state,
        upload: action.payload,
        isLoading: false,
        error: ''
      };
    case UPLOAD_FAILURE:
      return {
        ...state,
        isLoading: false,
        upload: {},
        error: action.payload
      };
    default:
      return state;
  }
}
