
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null, // Get user from localStorage
  isLoggedIn: JSON.parse(localStorage.getItem("isLoggedIn")) || false, // Ensure isLoggedIn is handled by Redux
};

//Selector
export const getStatus = (state) => state.auth.isLoggedIn;

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },

    removeUser: (state) => {
        state.user = null;
    },

    login: (state,action) => {
        // return { ...initialState, isLoggedIn: true };
        state.isLoggedIn =true;
        state.user  = action.payload;
        localStorage.setItem("isLoggedIn", "true");
    },

    logout: (state) => {
      state.isLoggedIn = false;
      state.user = null;
      localStorage.setItem("isLoggedIn", "false");
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
