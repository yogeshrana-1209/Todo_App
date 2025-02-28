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

export const uploadFile = (file) => async (dispatch) => {
  dispatch(uploadFileRequest());

  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await apiFile.post("/upload", formData);
    dispatch(uploadFileSuccess(response.data));
    SuccessNotify("File uploaded successfully");
  } catch (error) {
    const errorMessage = error.response?.data || "Upload failed";
    dispatch(uploadFileFailure(errorMessage));
    DangerNotify(errorMessage);
  }
};

const fileSlice = createSlice({
  name: "files",
  initialState,
  reducers: {
    uploadFileRequest: (state) => {
      state.status = "loading";
      state.error = null;
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

export const getStatus = (state) => state.files.status;
export const getError = (state) => state.files.error;

export const { uploadFileRequest, uploadFileSuccess, uploadFileFailure } = fileSlice.actions;
export default fileSlice.reducer;
