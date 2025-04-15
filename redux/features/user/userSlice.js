import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: "kaafi",
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

// ✅ Export the action
export const { setUser } = userSlice.actions;

// ✅ Export the reducer (this is the part that's missing or incorrect)
export default userSlice.reducer;
