import { takeLatest, call, put } from 'redux-saga/effects';

import {
  LOGIN_REQUEST,
  LOGIN_FAILURE,
  LOGIN_SUCCESS,
} from '../actions/actionTypes';

import { login } from '../api/auth';

/* LOG-IN */
function* loginWorker(action) {
  try {
    const result = yield call(login, action.data);
    // dispatch success action
    if (result.ok) {
      yield put({ type: LOGIN_SUCCESS, payload: result });
    } else {
      yield put({ type: LOGIN_FAILURE, payload: result });
    }
  } catch (error) {
    // dispatch failure action
    yield put({ type: LOGIN_FAILURE });
  }
}

export function* loginWatcher() {
  yield takeLatest(LOGIN_REQUEST, loginWorker);
}
