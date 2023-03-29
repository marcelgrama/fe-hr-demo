import { configureStore } from '@reduxjs/toolkit';
import { counterReducer } from '../features/counter';
import { freelancersReducer } from '../features/freelancers';
import { jobsReducer } from '../features/jobs';
import { persistReducer } from 'redux-persist'
import { combineReducers } from 'redux'
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';
import { userReducer } from '../features/auth';
import { freelanceProfileFormReducer } from '../features/freelanceProfileForms';


const reducers = combineReducers({
  counter: counterReducer,
  freelancers: freelancersReducer,
  jobs: jobsReducer,
  user: userReducer,
  freelanceForms: freelanceProfileFormReducer.reducer
});

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducers);


const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: [thunk],
});
export type RootState = ReturnType<typeof store.getState>;

export default store
