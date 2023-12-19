import userSlice from '../features/auth/userSlice';
import appSlice from '../features/app/appSlice';
import postSlice from '../features/postSlice';
import {configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage'
import {combineReducers} from "redux";
import {  persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist'

const reducers = combineReducers({
  app: appSlice,
  users: userSlice,
  post: postSlice,
});


const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    blacklist: ['post']
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
    reducer: persistedReducer,
    devTools: process.env.NODE_ENV !== 'production',
    middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    })
});

export default store;