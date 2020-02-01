import { BOOKING_REQUEST, BOOKING_FAILURE, BOOKING_SUCCESS } from './actionTypes';

import axios from 'axios';
import { API } from '../../constants/api';

export const setBookings = data => dispatch => {
  dispatch({ type: BOOKING_REQUEST });
  axios
    .post(`${API}/booking/set/bookings`, data)
    .then(res => {
      console.log(res, data);
      dispatch({
        type: BOOKING_SUCCESS,
        payload: res.data
      });
    })
    .catch(err => {
      console.log(err);
      dispatch({
        type: BOOKING_FAILURE,
        payload: err.response
      });
    });
};
