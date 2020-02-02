import {
  BOOKING_REQUEST,
  BOOKING_FAILURE,
  BOOKING_SUCCESS,
  ADD_BOOKING_REQUEST,
  ADD_BOOKING_FAILURE,
  ADD_BOOKING_SUCCESS,
  ADD_BOOKING_NOTES_REQUEST,
  ADD_BOOKING_NOTES_FAILURE,
  ADD_BOOKING_NOTES_SUCCESS
} from './actionTypes';

import axios from 'axios';
import { API } from '../../constants/api';

export const setBookings = data => dispatch => {
  dispatch({ type: BOOKING_REQUEST });
  axios
    .post(`${API}/booking/set/bookings`, data)
    .then(res => {
      dispatch({
        type: BOOKING_SUCCESS,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: BOOKING_FAILURE,
        payload: err.response
      });
    });
};

export const book = id => dispatch => {
  dispatch({ type: ADD_BOOKING_REQUEST });
  axios
    .post(`${API}/booking/book/${id}`)
    .then(res => {
      dispatch({
        type: ADD_BOOKING_SUCCESS,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: ADD_BOOKING_FAILURE,
        payload: err.response
      });
    });
};

export const setNotes = (id, notes) => dispatch => {
  dispatch({ type: ADD_BOOKING_NOTES_REQUEST });
  axios
    .post(`${API}/booking/note/${id}?notes=${encodeURI(notes)}`)
    .then(res => {
      dispatch({
        type: ADD_BOOKING_NOTES_SUCCESS,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: ADD_BOOKING_NOTES_FAILURE,
        payload: err.response
      });
    });
};
