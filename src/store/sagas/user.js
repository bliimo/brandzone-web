import { takeLatest, call, put } from 'redux-saga/effects';

import {
  GET_CURRENTUSER_REQUEST,
  GET_CURRENTUSER_FAILURE,
  GET_CURRENTUSER_SUCCESS,
  GET_USERS_REQUEST,
  GET_USERS_FAILURE,
  GET_USERS_SUCCESS,
  GET_USERINFO_REQUEST,
  GET_USERINFO_FAILURE,
  GET_USERINFO_SUCCESS,
  ADD_USER_REQUEST,
  ADD_USER_FAILURE,
  ADD_USER_SUCCESS,
  INVITE_USERS_REQUEST,
  INVITE_USERS_FAILURE,
  INVITE_USERS_SUCCESS,
  UPDATE_ACCOUNTSTATUS_REQUEST,
  UPDATE_ACCOUNTSTATUS_FAILURE,
  UPDATE_ACCOUNTSTATUS_SUCCESS,
  EDIT_USERINFO_REQUEST,
  EDIT_USERINFO_FAILURE,
  EDIT_USERINFO_SUCCESS,
  IMG_REQUEST,
  IMG_FAILURE,
  IMG_SUCCESS
} from '../actions/actionTypes';

import {
  getCurrentUser,
  getUsers,
  getUserInfo,
  addUser,
  inviteUsers,
  updateAccountStatus,
  editUserInfo,
  upload
} from '../api/user';

/* update account status */
function* updateAccountStatusWorker(action) {
  try {
    const result = yield call(updateAccountStatus, action.data);
    // dispatch success action
    if (result.ok) {
      yield put({ type: UPDATE_ACCOUNTSTATUS_SUCCESS, payload: result });
    } else {
      yield put({ type: UPDATE_ACCOUNTSTATUS_FAILURE, payload: result });
    }
  } catch (error) {
    // dispatch failure action
    yield put({ type: UPDATE_ACCOUNTSTATUS_FAILURE });
  }
}

export function* updateAccountStatusWatcher() {
  yield takeLatest(UPDATE_ACCOUNTSTATUS_REQUEST, updateAccountStatusWorker);
}

/* edit a user's info */
function* editUserInfoWorker(action) {
  try {
    const result = yield call(editUserInfo, action.data);
    // dispatch success action
    if (result.ok) {
      yield put({ type: EDIT_USERINFO_SUCCESS, payload: result });
    } else {
      yield put({ type: EDIT_USERINFO_FAILURE, payload: result });
    }
  } catch (error) {
    // dispatch failure action
    yield put({ type: EDIT_USERINFO_FAILURE });
  }
}

export function* editUserInfoWatcher() {
  yield takeLatest(EDIT_USERINFO_REQUEST, editUserInfoWorker);
}

/* invite users */
function* inviteUsersWorker(action) {
  try {
    const result = yield call(inviteUsers, action.data);
    // dispatch success action
    if (result.ok) {
      yield put({ type: INVITE_USERS_SUCCESS, payload: result });
    } else {
      yield put({ type: INVITE_USERS_FAILURE, payload: result });
    }
  } catch (error) {
    // dispatch failure action
    yield put({ type: INVITE_USERS_FAILURE });
  }
}

export function* inviteUsersWatcher() {
  yield takeLatest(INVITE_USERS_REQUEST, inviteUsersWorker);
}

/* add a new user */
function* addUserWorker(action) {
  try {
    const result = yield call(addUser, action.data);
    // dispatch success action
    if (result.ok) {
      yield put({ type: ADD_USER_SUCCESS, payload: result });
    } else {
      yield put({ type: ADD_USER_FAILURE, payload: result });
    }
  } catch (error) {
    // dispatch failure action
    yield put({ type: ADD_USER_FAILURE });
  }
}

export function* addUserWatcher() {
  yield takeLatest(ADD_USER_REQUEST, addUserWorker);
}

/* FETCH SPECIFIC USER'S INFO */
function* getUserInfoWorker(action) {
  try {
    const result = yield call(getUserInfo, action.data);
    // dispatch success action
    if (result.ok) {
      yield put({ type: GET_USERINFO_SUCCESS, payload: result });
    } else {
      yield put({ type: GET_USERINFO_FAILURE, payload: result });
    }
  } catch (error) {
    // dispatch failure action
    yield put({ type: GET_USERINFO_FAILURE });
  }
}

export function* getUserInfoWatcher() {
  yield takeLatest(GET_USERINFO_REQUEST, getUserInfoWorker);
}

/* FETCH CURRENT USER'S INFO */
function* getCurrentUserWorker(action) {
  try {
    const result = yield call(getCurrentUser, action.data);
    // dispatch success action
    if (result.ok) {
      yield put({ type: GET_CURRENTUSER_SUCCESS, payload: result });
    } else {
      yield put({ type: GET_CURRENTUSER_FAILURE, payload: result });
    }
  } catch (error) {
    // dispatch failure action
    yield put({ type: GET_CURRENTUSER_FAILURE });
  }
}

export function* getCurrentUserWatcher() {
  yield takeLatest(GET_CURRENTUSER_REQUEST, getCurrentUserWorker);
}

/* FETCH ALL USERS */
function* getUsersWorker(action) {
  try {
    const result = yield call(getUsers, action.data);
    // dispatch success action
    if (result.ok) {
      yield put({ type: GET_USERS_SUCCESS, payload: result });
    } else {
      yield put({ type: GET_USERS_FAILURE, payload: result });
    }
  } catch (error) {
    // dispatch failure action
    yield put({ type: GET_USERS_FAILURE });
  }
}

export function* getUsersWatcher() {
  yield takeLatest(GET_USERS_REQUEST, getUsersWorker);
}

function* uploadWorker(action) {
  try {
    const result = yield call(upload, action.data);
    // dispatch success action
    if (result.ok) {
      yield put({ type: IMG_SUCCESS, payload: result });
    } else {
      yield put({ type: IMG_FAILURE, payload: result });
    }
  } catch (error) {
    // dispatch failure action
    yield put({ type: IMG_FAILURE });
  }
}

export function* uploadWatcher() {
  yield takeLatest(IMG_REQUEST, uploadWorker);
}
