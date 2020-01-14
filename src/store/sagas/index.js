import { fork, all } from 'redux-saga/effects';

import { loginWatcher } from './auth';
import { getCurrentUserWatcher, getUsersWatcher, getUserInfoWatcher, addUserWatcher, inviteUsersWatcher, updateAccountStatusWatcher, editUserInfoWatcher } from './user';
function* rootSaga() {
  yield all([fork(loginWatcher)]);
  yield all([fork(getCurrentUserWatcher)]);
  yield all([fork(getUsersWatcher)]);
  yield all([fork(getUserInfoWatcher)]);
  yield all([fork(addUserWatcher)]);
  yield all([fork(inviteUsersWatcher)]);
  yield all([fork(updateAccountStatusWatcher)]);
  yield all([fork(editUserInfoWatcher)]);
}

export default rootSaga;
