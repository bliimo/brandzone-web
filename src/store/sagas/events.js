import { takeLatest, call, put } from 'redux-saga/effects';

import { EVENTS_REQUEST, EVENTS_FAILURE, EVENTS_SUCCESS } from '../actions/actionTypes';

import { getLatestEvents } from '../api/events';

/* LOG-IN */
function* eventWorker(action) {
  try {
    const result = yield call(getLatestEvents, action.data);
    // dispatch success action
    if (result.ok) {
      yield put({ type: EVENTS_SUCCESS, payload: result });
    } else {
      yield put({ type: EVENTS_FAILURE, payload: result });
    }
  } catch (error) {
    // dispatch failure action
    yield put({ type: EVENTS_FAILURE });
  }
}

export function* eventWatcher() {
  yield takeLatest(EVENTS_REQUEST, eventWorker);
}
