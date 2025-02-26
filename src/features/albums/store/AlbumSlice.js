import { createSlice } from "@reduxjs/toolkit";
import { apiAlbum } from "../../../services/api/axiosConfig";

const initialState = {
  albums: [],
  page: 1,
  limit: 5,
  maxRecords: 100,
  searchTerm: "",
};

export const fetchAlbums =
  (page, searchTerm = "") =>
  async (dispatch, getState) => {
    try {
      const { limit } = getState().album;
      const searchQuery = searchTerm ? `&q=${searchTerm}` : "";

      const response = await apiAlbum.get(
        `/photos?_page=${page}&_limit=${limit}${searchQuery}`
      );
      dispatch(setAlbums(response.data));

      const totalRecords = response.headers["x-total-count"];
      // console.log(("Total Records: ", totalRecords));

      if (totalRecords && !isNaN(totalRecords)) {
        dispatch(setMaxRecords(parseInt(totalRecords, 10)));
      } else {
        dispatch(setMaxRecords(0));
      }
    } catch (error) {
      console.error("Something went wrong in API", error);
    }
  };

export const getAlbumList = (state) => state.album.albums;
export const getCurrentPage = (state) => state.album.page;
export const getLimit = (state) => state.album.limit;
export const getMaxRecords = (state) => state.album.maxRecords;
export const getSearchTerm = (state) => state.album.searchTerm;

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
      state.maxRecords = 0;
    },
    setMaxRecords: (state, action) => {
      console.log("Max Records: ", action.payload);
      state.maxRecords = action.payload;
    },
    resetPage: (state) => {
      state.page = 1;
      state.maxRecords = 0;
    },
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
      state.page = 1;
      state.maxRecords = 0;
    },
  },
});

export const {
  setAlbums,
  setPage,
  setLimit,
  setMaxRecords,
  resetPage,
  setSearchTerm,
} = albumSlice.actions;

export default albumSlice.reducer;
