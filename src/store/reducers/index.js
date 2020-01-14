import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import auth from './auth';
import user from './user';

const authPersistConfig = {
  key: 'auth',
  storage,
};

const userPersistConfig = {
  key: 'user',
  storage,
};

const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, auth),
  user: persistReducer(userPersistConfig, user),
});

export default rootReducer;
