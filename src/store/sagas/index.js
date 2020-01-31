import { fork, all } from 'redux-saga/effects';

import { loginWatcher } from './auth';
import { institutionWatcher } from './institution';
import {
  getCurrentUserWatcher,
  getUsersWatcher,
  getUserInfoWatcher,
  addUserWatcher,
  inviteUsersWatcher,
  updateAccountStatusWatcher,
  editUserInfoWatcher,
  uploadWatcher
} from './user';
function* rootSaga() {
  yield all([fork(loginWatcher)]);
  yield all([fork(getCurrentUserWatcher)]);
  yield all([fork(getUsersWatcher)]);
  yield all([fork(getUserInfoWatcher)]);
  yield all([fork(addUserWatcher)]);
  yield all([fork(inviteUsersWatcher)]);
  yield all([fork(updateAccountStatusWatcher)]);
  yield all([fork(editUserInfoWatcher)]);
  yield all([fork(institutionWatcher)]);
  yield all([fork(uploadWatcher)]);
}

export default rootSaga;
