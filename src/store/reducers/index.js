import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import auth from './auth';
import user from './user';
import institution from './institution';
import events from './events';

const authPersistConfig = {
  key: 'auth',
  storage
};

const userPersistConfig = {
  key: 'user',
  storage
};
const institutionPersistConfig = {
  key: 'institution',
  storage
};
const eventsPersistConfig = {
  key: 'events',
  storage
};

const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, auth),
  user: persistReducer(userPersistConfig, user),
  institution: persistReducer(institutionPersistConfig, institution),
  events: persistReducer(eventsPersistConfig, events)
});

export default rootReducer;
