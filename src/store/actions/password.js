import {
  PASSWORD_UPDATE_REQUEST,
  PASSWORD_UPDATE_FAILURE,
  PASSWORD_UPDATE_SUCCESS
} from './actionTypes';

import axios from 'axios';
import { API } from '../../constants/api';

export const passwordUpdate = data => dispatch => {
  const config = {
    headers: {
      Authorization: localStorage.getItem('jwtToken')
    }
  };
  dispatch({ type: PASSWORD_UPDATE_REQUEST });
  axios
    .put(`${API}/password/update`, data, config)
    .then(res => {
      dispatch({
        type: PASSWORD_UPDATE_SUCCESS,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch({
        type: PASSWORD_UPDATE_FAILURE,
        payload: err.response.data.message
      })
    );
};
