import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import passwordReducer from '../features/passwords/passwordSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    passwords: passwordReducer
  },
});
