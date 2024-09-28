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
      state.status = true, 
      state.userInfo = action.payload;
      
      // state.userToken=action.payload
    },
    logout: (state) => {
      localStorage.removeItem("userToken");
      state.status = false;
      state.userInfo = null;
      
    },
      // Single function to update all user information
      updateUserInfo: (state, action) => {
        const updatedInfo = action.payload; // Assuming payload contains all user info fields
        state.userInfo = {
          ...state.userInfo,
          ...updatedInfo,  // Merge existing and updated user info
        };
      },
  },
});

export const { login, logout,updateUserInfo } = authSlice.actions;
export default authSlice.reducer;
