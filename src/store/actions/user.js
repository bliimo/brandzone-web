import {
  GET_CURRENTUSER_REQUEST,
  GET_USERS_REQUEST,
  GET_USERINFO_REQUEST,
  ADD_USER_REQUEST,
  INVITE_USERS_REQUEST,
  UPDATE_ACCOUNTSTATUS_REQUEST,
  EDIT_USERINFO_REQUEST,
} from './actionTypes';

export const getCurrentUser = data => ({
  type: GET_CURRENTUSER_REQUEST,
  data,
});

export const getUsers = data => ({
  type: GET_USERS_REQUEST,
  data,
});

export const getUserInfo = data => ({
  type: GET_USERINFO_REQUEST,
  data,
});

export const addUser = data => ({
  type: ADD_USER_REQUEST,
  data,
});

export const inviteUsers = data => ({
  type: INVITE_USERS_REQUEST,
  data,
});

export const updateAccountStatus = data => ({
  type: UPDATE_ACCOUNTSTATUS_REQUEST,
  data,
});

export const editUserInfo = data => ({
  type: EDIT_USERINFO_REQUEST,
  data,
});
