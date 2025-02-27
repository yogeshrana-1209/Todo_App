import { createSlice } from "@reduxjs/toolkit";
import { apiFile } from "../../../services/api/axiosConfig";

const initialState = {
  files: [],
  status: "idle",
  error: null,
};

//Selectors
export const getFiles = (state) => state.files.files;
export const getError = (state) => state.files.error;
export const getStatus = (state) => state.files.status;

export const uploadFile = (fileData) => async (dispatch) => {
  try {
    dispatch(uploadFileStart());

    const formData = new FormData();
    formData.append("file", fileData);

    const response = await apiFile.post("/upload", formData);
    dispatch(uploadFileSuccess(response.data));
  } catch (error) {
    dispatch(uploadFileFailure(error.message));
  }
};

const fileSlice = createSlice({
  name: "files",
  initialState,
  reducers: {
    uploadFileStart: (state) => {
      state.status = "loading";
    },
    uploadFileSuccess: (state, action) => {
      state.status = "succeeded";
      state.files.push(action.payload);
    },
    uploadFileFailure: (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    },
  },
});

export const { uploadFileStart, uploadFileSuccess, uploadFileFailure } =
  fileSlice.actions;

export default fileSlice.reducer;
