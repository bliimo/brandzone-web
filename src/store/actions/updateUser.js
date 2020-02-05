import axios from 'axios';
import { API } from '../../constants/api';

import { UPDATE_USER_REQUEST, UPDATE_USER_SUCCESS, UPDATE_USER_FAILURE } from './actionTypes';

export const updateUser = data => dispatch => {
  dispatch({
    type: UPDATE_USER_REQUEST
  });
  axios
    .put(`${API}/${data.userType}/update/${data.id}`, data)
    .then(res => {
      dispatch({
        type: UPDATE_USER_SUCCESS,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: UPDATE_USER_FAILURE,
        payload: err.response.data.message
      });
    });
};
