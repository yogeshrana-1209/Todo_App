import { createSlice } from "@reduxjs/toolkit";
import { apiAlbum } from "../../../services/api/axiosConfig";

// const MAX_RECORDS = 100;
// const LIMIT = 10;

const initialState = {
  albums: [],
  page: 1,
  limit: 10,
  maxRecords: 100,
};

export const fetchAlbums = (page) => async (dispatch, getState) => {
  try {
    const { limit, maxRecords } = getState().album;

    if (page > Math.ceil(maxRecords / limit)) {
      console.warn("No more records to fetch.");
      return;
    }

    const response = await apiAlbum.get(
      `/photos?_page=${page}&_limit=${limit}`
    );
    dispatch(setAlbums(response.data));

    const totalRecords = response.headers["x-total-count"];
    console.log("Total Records: ", totalRecords);

    if (totalRecords) {
      const data = dispatch(
        setMaxRecords(Math.min(parseInt(totalRecords), 100))
      );
      console.log("Max Records: ", data);
    }
  } catch (error) {
    console.error("Something went wrong in API", error);
  }
};

export const getAlbumList = (state) => state.album.albums;
export const getCurrentPage = (state) => state.album.page;
export const getLimit = (state) => state.album.limit;
export const getMaxRecords = (state) => state.album.maxRecords;

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
    setMaxRecords: (state, action) => {
      state.maxRecords = action.payload;
    },
  },
});

export const { setAlbums, setPage, setLimit, setMaxRecords } =
  albumSlice.actions;

export default albumSlice.reducer;
