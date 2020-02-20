import { INSTITUTION_REQUEST, INSTITUTION_FAILURE, INSTITUTION_SUCCESS } from './actionTypes';
import axios from 'axios';
import { API } from '../../constants/api';

export const getInstitution = () => dispatch => {
  dispatch({ type: INSTITUTION_REQUEST });
  axios
    .get(`${API}/institutionType/showAll`)
    .then(res => {
      console.log(res);
      dispatch({
        type: INSTITUTION_SUCCESS,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch({
        type: INSTITUTION_FAILURE,
        payload: err.response
      })
    );
};
