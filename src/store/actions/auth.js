import { LOGIN_REQUEST, LOGOUT } from './actionTypes';

export const login = data => ({
  type: LOGIN_REQUEST,
  data,
});

export const logout = () => ({
  type: LOGOUT,
});
