import {
  NOTIFICATION_REQUEST,
  NOTIFICATION_FAILURE,
  NOTIFICATION_SUCCESS,
  VIEW_NOTIFICATION_REQUEST,
  VIEW_NOTIFICATION_SUCCESS,
  VIEW_NOTIFICATION_FAILURE
} from './actionTypes';

import axios from 'axios';
import { API } from '../../constants/api';

export const getNotifications = () => dispatch => {
  const config = {
    headers: {
      Authorization: localStorage.getItem('jwtToken')
    }
  };
  dispatch({ type: NOTIFICATION_REQUEST });
  axios
    .get(`${API}/notif/showAll`, config)
    .then(res => {
      dispatch({
        type: NOTIFICATION_SUCCESS,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch({
        type: NOTIFICATION_FAILURE,
        payload: err.response
      })
    );
};

export const viewNotifications = id => dispatch => {
  const config = {
    headers: {
      Authorization: localStorage.getItem('jwtToken')
    }
  };
  dispatch({ type: NOTIFICATION_REQUEST });
  axios
    .put(`${API}/notif/viewed/${id}`, config)
    .then(res => {
      dispatch({
        type: NOTIFICATION_SUCCESS,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch({
        type: NOTIFICATION_FAILURE,
        payload: err.response
      })
    );
};

export const viewNotificationById = id => dispatch => {
  const config = {
    headers: {
      Authorization: localStorage.getItem('jwtToken')
    }
  };
  dispatch({ type: VIEW_NOTIFICATION_REQUEST });
  axios
    .get(`${API}/notif/${id}`, config)
    .then(res => {
      dispatch({
        type: VIEW_NOTIFICATION_SUCCESS,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch({
        type: VIEW_NOTIFICATION_FAILURE,
        payload: err.response
      })
    );
};
