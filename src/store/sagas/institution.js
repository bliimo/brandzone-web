import { takeLatest, call, put } from 'redux-saga/effects';

import {
  INSTITUTION_REQUEST,
  INSTITUTION_FAILURE,
  INSTITUTION_SUCCESS
} from '../actions/actionTypes';

import { getInstitution } from '../api/institution';

/* LOG-IN */
function* getInstitutionWorker(action) {
  try {
    const result = yield call(getInstitution, action.data);
    // dispatch success action
    if (result.ok) {
      yield put({ type: INSTITUTION_SUCCESS, payload: result });
    } else {
      yield put({ type: INSTITUTION_FAILURE, payload: result });
    }
  } catch (error) {
    // dispatch failure action
    yield put({ type: INSTITUTION_FAILURE });
  }
}

export function* institutionWatcher() {
  yield takeLatest(INSTITUTION_REQUEST, getInstitutionWorker);
}
