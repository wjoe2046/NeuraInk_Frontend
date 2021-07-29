import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "components/auth";

const store = configureStore({
  reducer: {
    auth: authSlice,
  },
});

export default store;
