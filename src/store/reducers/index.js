import { combineReducers } from 'redux';
import authReducer from './auth';
import eventReducer from './events';
import institutionReducer from './institution';
import userReducer from './user';
import bookingReducer from './booking';
import updateUserReducer from './updateUser';

export default combineReducers({
  auth: authReducer,
  event: eventReducer,
  institution: institutionReducer,
  user: userReducer,
  booking: bookingReducer,
  updateUser: updateUserReducer
});
