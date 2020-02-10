import { UPLOAD_REQUEST, UPLOAD_FAILURE, UPLOAD_SUCCESS } from './actionTypes';

import axios from 'axios';
import { API } from '../../constants/api';

export const upload = (data, id) => dispatch => {
  const config = {
    headers: {
      'content-type': 'multipart/form-data'
    }
  };
  dispatch({ type: UPLOAD_REQUEST });
  axios
    .post(`${API}/storage/uploadByUserId/${id}`, data, config)
    .then(res => {
      dispatch({
        type: UPLOAD_SUCCESS,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch({
        type: UPLOAD_FAILURE,
        payload: err.response
      })
    );
};
