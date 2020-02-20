import { combineReducers } from 'redux';
import authReducer from './auth';
import eventReducer from './events';
import institutionReducer from './institution';
import userReducer from './user';
import bookingReducer from './booking';
import updateUserReducer from './updateUser';
import addInstitutionReducer from './addInstitution';
import multipleEventReducer from './multipleEvent';
import uploadReducer from './upload';
import reportReducer from './report';
import notificationReducer from './notification';

export default combineReducers({
  auth: authReducer,
  event: eventReducer,
  institution: institutionReducer,
  user: userReducer,
  booking: bookingReducer,
  updateUser: updateUserReducer,
  addInstitution: addInstitutionReducer,
  multipleEvent: multipleEventReducer,
  upload: uploadReducer,
  report: reportReducer,
  notification: notificationReducer
});
