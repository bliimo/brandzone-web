import { get } from 'lodash';
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
  IMG_SUCCESS,
  LOGOUT
} from '../actions/actionTypes';

const initialState = {
  isFetching: false,
  isFetchingUserInfo: false,
  isRequesting: false,
  requestSuccessful: false,
  hasError: false,
  error: {},
  response: {},
  payload: {},
  currentUserInfo: {},
  users: [],
  userInfo: {},
  isUploading: false,
  isUploaded: true
};

const user = (state = initialState, action) => {
  switch (action.type) {
    case GET_USERS_REQUEST:
      return {
        ...state,
        isFetching: true,
        hasError: false
      };

    case GET_CURRENTUSER_REQUEST:
    case GET_USERINFO_REQUEST:
      return {
        ...state,
        isFetchingUserInfo: true,
        hasError: false
      };

    case ADD_USER_REQUEST:
    case INVITE_USERS_REQUEST:
    case UPDATE_ACCOUNTSTATUS_REQUEST:
    case EDIT_USERINFO_REQUEST:
      return {
        ...state,
        isRequesting: true,
        error: {},
        hasError: false
      };

    case GET_CURRENTUSER_FAILURE:
    case GET_USERINFO_FAILURE:
      return {
        ...state,
        isFetchingUserInfo: false,
        hasError: true,
        payload: get(action, 'payload')
      };

    case ADD_USER_FAILURE:
    case INVITE_USERS_FAILURE:
    case UPDATE_ACCOUNTSTATUS_FAILURE:
    case EDIT_USERINFO_FAILURE:
      return {
        ...state,
        isRequesting: false,
        requestSuccessful: false,
        hasError: true,
        error: get(action, 'payload'),
        payload: get(action, 'payload')
      };

    case GET_USERS_FAILURE:
      return {
        ...state,
        isFetching: false,
        hasError: true,
        payload: get(action, 'payload')
      };

    case GET_CURRENTUSER_SUCCESS:
      return {
        ...state,
        isFetchingUserInfo: false,
        hasError: false,
        currentUserInfo: get(action, 'payload.user')
      };

    case GET_USERS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        hasError: false,
        users: get(action, 'payload.user')
      };

    case GET_USERINFO_SUCCESS:
      return {
        ...state,
        isFetchingUserInfo: false,
        hasError: false,
        userInfo: get(action, 'payload.user')
      };

    case ADD_USER_SUCCESS:
    case INVITE_USERS_SUCCESS:
    case UPDATE_ACCOUNTSTATUS_SUCCESS:
    case EDIT_USERINFO_SUCCESS:
      return {
        ...state,
        isRequesting: false,
        requestSuccessful: true,
        hasError: false,
        error: {},
        response: get(action, 'payload'),
        payload: get(action, 'payload')
      };

    case IMG_REQUEST:
      return {
        ...state,
        isUploading: true,
        error: {},
        hasError: false
      };

    case IMG_FAILURE:
      return {
        ...state,
        isUploading: false,
        error: {},
        hasError: false
      };

    case IMG_SUCCESS:
      return {
        ...state,
        isUploading: false,
        isUploaded: true,
        error: {},
        hasError: false
      };

    case LOGOUT:
      sessionStorage.clear();
      return {
        ...initialState
      };

    default:
      return state;
  }
};

export default user;
