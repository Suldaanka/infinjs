import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: undefined, // undefined means "not yet loaded"
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload; // e.g., { id, name, role, email }
    },
    clearUser: (state) => {
      state.user = null; // null means "explicitly logged out"
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;

export default userSlice.reducer;
