import { REPORT_REQUEST, REPORT_FAILURE, REPORT_SUCCESS } from './actionTypes';

import axios from 'axios';
import { API } from '../../constants/api';

export const getReports = () => dispatch => {
  const config = {
    headers: {
      Authorization: localStorage.getItem('jwtToken')
    }
  };
  dispatch({ type: REPORT_REQUEST });
  axios
    .get(`${API}/generateReport`, config)
    .then(res => {
      dispatch({
        type: REPORT_SUCCESS,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch({
        type: REPORT_FAILURE,
        payload: err.response
      })
    );
};
