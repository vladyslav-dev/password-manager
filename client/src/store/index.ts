import {combineReducers, configureStore} from '@reduxjs/toolkit';
import authReducer from './slices/auth';
import passwordReducer from './slices/password';

const rootReducer = combineReducers({
    authReducer,
    passwordReducer
});

const store = configureStore({
    reducer: rootReducer
})

export type RootState = ReturnType<typeof store.getState>

export default store;