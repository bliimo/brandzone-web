import {
  LOGIN_REQUEST,
  LOGIN_FAILURE,
  LOGOUT_REQUEST,
  SET_LOGGEDIN_USER,
  LOGIN_SUCCESS,
  SET_CURRENT_USER
} from './actionTypes';

import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { API } from '../../constants/api';
import setAuthToken from '../../utils/setAuthToken';

export const loginUser = userData => dispatch => {
  dispatch({ type: LOGIN_REQUEST });
  axios
    .post(`${API}/user/login`, userData)
    .then(res => {
      if (res.data.userType !== 'Admin') {
        const { accessToken, tokenType } = res.data;
        const token = `${tokenType} ${accessToken}`;
        localStorage.setItem('jwtToken', token);
        setAuthToken(token);
        const decoded = jwt_decode(token);
        dispatch({ type: LOGIN_SUCCESS, payload: setCurrentUser(decoded) });
      } else {
        dispatch({
          type: LOGIN_FAILURE,
          payload: 'Account is not accessable here'
        });
      }
    })
    .catch(err => {
      dispatch({
        type: LOGIN_FAILURE,
        payload: err.response.data.message
      });
    });
};

export const setCurrentUser = decoded => dispatch => {
  dispatch({ type: LOGIN_REQUEST });
  if (decoded.sub) {
    dispatch(setLoggedInUser(decoded.sub));
  }
  dispatch({
    type: SET_CURRENT_USER,
    payload: decoded
  });
};

export const setLoggedInUser = id => dispatch => {
  dispatch({ type: LOGIN_REQUEST });
  axios
    .get(`${API}/user/${id}`)
    .then(res => {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data.data
      });
    })
    .catch(err =>
      dispatch({
        type: LOGIN_FAILURE,
        payload: err.response.data.message
      })
    );
};

export const logoutUser = () => dispatch => {
  dispatch({ type: LOGOUT_REQUEST });
  localStorage.removeItem('jwtToken');
  setAuthToken(false);
  dispatch(setCurrentUser({}));
  dispatch({
    type: LOGIN_SUCCESS,
    payload: {}
  });
};
