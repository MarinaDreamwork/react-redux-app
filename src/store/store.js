import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { logger } from './middleware/logger';
import taskReducer from './task';
import errorReducer from './errors';

function createStore() {
  return configureStore({
    reducer: rootReducer, 
    middleware: (getDefaultMiddleware) => 
      getDefaultMiddleware().concat(logger),
    devtools: process.env.NODE_ENV !== 'production' 
  });
};

const rootReducer = combineReducers({
  errors: errorReducer,
  tasks: taskReducer
})

export default createStore;