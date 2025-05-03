import { configureStore } from '@reduxjs/toolkit'
import userReducer from './features/user/userSlice'
import languageReducer from './features/initialLanguage/langSlice';
import  roomSlice  from './features/room/roomSlice';
import  orderSlice  from './features/order/orderSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    room: roomSlice,
    language: languageReducer,
    order: orderSlice
  },
})