import { takeLatest, call, put } from 'redux-saga/effects';

import { BOOKING_REQUEST, BOOKING_FAILURE, BOOKING_SUCCESS } from '../actions/actionTypes';

import { setBookings } from '../api/booking';

/* LOG-IN */
function* bookingWorker(action) {
  try {
    const result = yield call(setBookings, action.data);
    // dispatch success action
    if (result.ok) {
      yield put({ type: BOOKING_SUCCESS, payload: result });
    } else {
      yield put({ type: BOOKING_FAILURE, payload: result });
    }
  } catch (error) {
    // dispatch failure action
    yield put({ type: BOOKING_FAILURE });
  }
}

export function* bookingWatcher() {
  yield takeLatest(BOOKING_REQUEST, bookingWorker);
}
