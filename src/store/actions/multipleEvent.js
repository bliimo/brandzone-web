import {
  GET_MULTIPLE_EVENTS_REQUEST,
  GET_MULTIPLE_EVENTS_FAILURE,
  GET_MULTIPLE_EVENTS_SUCCESS
} from './actionTypes';

import axios from 'axios';
import { API } from '../../constants/api';

export const getMultipleLatestEvents = () => dispatch => {
  dispatch({ type: GET_MULTIPLE_EVENTS_REQUEST });
  axios
    .get(`${API}/multipleEvent/latest`)
    .then(res => {
      dispatch({
        type: GET_MULTIPLE_EVENTS_SUCCESS,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch({
        type: GET_MULTIPLE_EVENTS_FAILURE,
        payload: err.response
      })
    );
};
