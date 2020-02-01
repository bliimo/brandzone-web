import { EVENTS_REQUEST, EVENTS_FAILURE, EVENTS_SUCCESS } from './actionTypes';

import axios from 'axios';
import { API } from '../../constants/api';

export const getLatestEvents = () => dispatch => {
  dispatch({ type: EVENTS_REQUEST });
  axios
    .get(`${API}/event/latest`)
    .then(res => {
      dispatch({
        type: EVENTS_SUCCESS,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch({
        type: EVENTS_FAILURE,
        payload: err.response
      })
    );
};
