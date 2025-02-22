import { createSlice } from "@reduxjs/toolkit";
import { apiAlbum } from "../../../services/api/axiosConfig";

const initialState = {
  albums: [],
  page: 1,
  limit: 10,
};

export const fetchAlbums = (page, limit) => async (dispatch) => {
  try {
    const response = await apiAlbum.get(`/photos?page=${page}&limit=${limit}`);
    dispatch(setAlbums(response.data));
    // console.log(response);
  } catch (error) {
    console.error("Something went wrong in API", error);
  }
};

const albumSlice = createSlice({
  name: "album",
  initialState,
  reducers: {
    setAlbums: (state, action) => {
      state.albums = action.payload;
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
    setLimit: (state, action) => {
      state.limit = action.payload;
    },
  },
});

export const { setAlbums, setPage, setLimit } = albumSlice.actions;

export default albumSlice.reducer;
