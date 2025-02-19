import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: {},
    isAuthenticated: false,
  },
  reducers: {
    updateUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = !state.isAuthenticated;
    },
    invalidateUser: (state) => {
      state.user = {};
      state.isAuthenticated = !state.isAuthenticated;
    },
  },
});

export const { updateUser, invalidateUser } = userSlice.actions;

export default userSlice.reducer;
