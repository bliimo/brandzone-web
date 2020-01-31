import { get } from 'lodash';
import {
  INSTITUTION_REQUEST,
  INSTITUTION_FAILURE,
  INSTITUTION_SUCCESS
} from '../actions/actionTypes';

const initialState = {
  hasError: false,
  error: {},
  payload: {}
};

const institution = (state = initialState, action) => {
  switch (action.type) {
    case INSTITUTION_REQUEST:
      return {
        ...state,
        hasError: false
      };
    case INSTITUTION_FAILURE:
      return {
        ...state,
        hasError: true,
        payload: get(action, 'payload')
      };
    case INSTITUTION_SUCCESS:
      return {
        ...state,
        payload: get(action, 'payload')
      };

    default:
      return state;
  }
};

export default institution;
