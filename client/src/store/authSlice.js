import { createSlice } from "@reduxjs/toolkit";

// const userToken = localStorage.getItem('userToken')
//   ? localStorage.getItem('userToken')
//   : null

const initialState = {
  userInfo: null,
  status: false,
  // userToken
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      (state.status = true), (state.userInfo = action.payload);
    },
    logout: (state) => {
      localStorage.removeItem("userToken");
      (state.status = false), (state.userInfo = null);
      // state.userToken = null
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
