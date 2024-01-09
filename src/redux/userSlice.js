// src/redux/userSlice.js

import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {},
  reducers: {
    setUser: (state, action) => action.payload,
    // Other reducers if any
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
