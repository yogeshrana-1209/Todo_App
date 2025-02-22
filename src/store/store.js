import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "../features/todos/store/TodoSlice";
import authReducer from "../features/auth/store/AuthSlice";

export const store = configureStore({
  reducer: {
    todo: todoReducer, // Ensure the key matches the name of the slice
    auth: authReducer,
  },
});

export default store;
