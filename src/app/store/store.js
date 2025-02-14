import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "../todos/store/TodoSlice";
import authReducer from '../todos/store/AuthSlice';

export const store = configureStore({
  reducer: {
    todo: todoReducer, // Ensure the key matches the name of the slice
    auth: authReducer
  },
});
