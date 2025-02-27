import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "../features/todos/store/TodoSlice";
import authReducer from "../features/auth/store/AuthSlice";
import albumReducer from "../features/albums/store/albumSlice";
import fileReducer from "../features/files/store/fileSlice";

export const store = configureStore({
  reducer: {
    todo: todoReducer, // Ensure the key matches the name of the slice
    auth: authReducer,
    album: albumReducer,
    files: fileReducer,
  },
});

export default store;
