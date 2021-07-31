import { createSlice } from "@reduxjs/toolkit";
import { UI_COMPONENTS } from "./constants";

const initialState = {
  isOpen: false,
  activeComponent: UI_COMPONENTS.SIGNUP,
  redirectUrl: "/",
  isLoggedIn: false,
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    closeModal: (state) => {
      state.isOpen = false;
    },

    openModal: (state) => {
      state.isOpen = true;
    },

    setActiveComponent: (state, { payload }) => {
      state.activeComponent = payload;
    },

    loginUser: (state, { payload }) => {
      state.isLoggedIn = true;
      state.user = payload;
    },
  },
});

export const { openModal, closeModal, setActiveComponent, loginUser } =
  authSlice.actions;
export const selectAuthSlice = (state) => state.auth;
export const selectUser = (state) => state.auth.user;
export const selectIsLoggedin = (state) => state.auth.isLoggedIn;
export default authSlice.reducer;
