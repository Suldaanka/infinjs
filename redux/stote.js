import { configureStore } from '@reduxjs/toolkit'
import userReducer from './features/user/userSlice'
import languageReducer from './features/initialLanguage/langSlice';
import  roomSlice  from './features/room/roomSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    room: roomSlice,
    language: languageReducer
  },
})