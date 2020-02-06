import axios from 'axios';
import { API } from '../../constants/api';
import {
  ADD_INSTITUTION_REQUEST,
  ADD_INSTITUTION_FAILURE,
  ADD_INSTITUTION_SUCCESS
} from './actionTypes';

export const addInstitution = data => dispatch => {
  dispatch({ type: ADD_INSTITUTION_REQUEST });
  axios
    .post(`${API}/institutionType/add?name=${encodeURI(data)}`)
    .then(res => {
      dispatch({
        type: ADD_INSTITUTION_SUCCESS,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch({
        type: ADD_INSTITUTION_FAILURE,
        payload: err.response
      })
    );
};
