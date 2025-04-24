import { configureStore } from '@reduxjs/toolkit'
import userReducer from './features/user/userSlice'
import languageReducer from './features/initialLanguage/langSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    language: languageReducer,
  },
})