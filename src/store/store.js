import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "../features/todos/store/TodoSlice";
import authReducer from "../features/auth/store/AuthSlice";
import albumReducer from "../features/albums/store/AlbumSlice";

export const store = configureStore({
  reducer: {
    todo: todoReducer, // Ensure the key matches the name of the slice
    auth: authReducer,
    album: albumReducer,
  },
});

export default store;
