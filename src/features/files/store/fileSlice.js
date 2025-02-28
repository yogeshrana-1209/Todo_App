import { createSlice } from "@reduxjs/toolkit";
import { apiFile } from "../../../services/api/axiosConfig";
import {
  SuccessNotify,
  DangerNotify,
} from "../../../components/sharedComponent/ui/notification";

const initialState = {
  files: [],
  status: "idle",
  error: null,
};

export const uploadFile = (fileData) => async (dispatch) => {
  dispatch(uploadFileRequest());

  try {
    const response = await apiFile.post("/upload", fileData);
    dispatch(uploadFileSuccess(response.data));
    SuccessNotify("File uploaded successfully");
  } catch (error) {
    const errorMessage = error.response?.data || "Upload failed";
    dispatch(uploadFileFailure(errorMessage));
    DangerNotify(errorMessage);
  }
};

//Selectors
export const getFiles = (state) => state.files.files;
export const getError = (state) => state.files.error;
export const getStatus = (state) => state.files.status;

const fileSlice = createSlice({
  name: "files",
  initialState,
  reducers: {
    uploadFileRequest: (state) => {
      state.status = "loading";
    },
    uploadFileSuccess: (state, action) => {
      state.status = "succeeded";
      state.files = [...state.files, action.payload];
    },
    uploadFileFailure: (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    },
  },
});

export const { uploadFileRequest, uploadFileSuccess, uploadFileFailure } =
  fileSlice.actions;

export default fileSlice.reducer;
