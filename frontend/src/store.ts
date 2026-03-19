import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/authSlice';
import userReducer from './features/userSlice';
import orderReducer from './features/orderSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    users: userReducer,
    orders: orderReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
