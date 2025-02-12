import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "../todos/store/TodoSlice";


export const store = configureStore({
  reducer: {
    todo: todoReducer, // Ensure the key matches the name of the slice
  },
});
