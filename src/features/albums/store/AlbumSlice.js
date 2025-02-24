import { createSlice } from "@reduxjs/toolkit";
import { apiAlbum } from "../../../services/api/axiosConfig";

const MAX_RECORDS = 100;
const LIMIT = 10;

const initialState = {
  albums: [],
  page: 1,
  limit: LIMIT,
};

export const fetchAlbums = (page) => async (dispatch) => {
  try {
    // const start = (page - 1) * LIMIT;

    if (page > MAX_RECORDS) {
      console.warn("No more records to fetch.");
      return;
    }

    const response = await apiAlbum.get(
      `/photos?_page=${page}&_limit=${LIMIT}`
    );
    dispatch(setAlbums(response.data));
    // console.log(response);
  } catch (error) {
    console.error("Something went wrong in API", error);
  }
};

export const getAlbumList = (state) => state.album.albums;
export const getCurrentPage = (state) => state.album.page;
export const getLimit = (state) => state.album.limit;

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
  },
});

export const { setAlbums, setPage } = albumSlice.actions;

export default albumSlice.reducer;
