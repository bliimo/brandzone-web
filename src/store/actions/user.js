import axios from 'axios';
import { API } from '../../constants/api';

import { ADD_USER_REQUEST, ADD_USER_SUCCESS, ADD_USER_FAILURE } from './actionTypes';

export const addUser = data => dispatch => {
  dispatch({
    type: ADD_USER_REQUEST
  });
  axios
    .post(`${API}/${data.userType}/register`, data)
    .then(res => {
      dispatch({
        type: ADD_USER_SUCCESS,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: ADD_USER_FAILURE,
        payload: err.response.data.message
      });
    });
};
