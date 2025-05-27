import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../../services/api/axiosConfig';

export const uploadFile = createAsyncThunk('file/upload', async (file, thunkAPI) => {
  try {
    const formData = new FormData();
    formData.append('file', file);

    const response = await api.post('/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

const fileSlice = createSlice({
  name: 'file',
  initialState: {
    uploading: false,
    uploadedData: null,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(uploadFile.pending, (state) => {
        state.uploading = true;
        state.error = null;
      })
      .addCase(uploadFile.fulfilled, (state, action) => {
        state.uploading = false;
        state.uploadedData = action.payload;
      })
      .addCase(uploadFile.rejected, (state, action) => {
        state.uploading = false;
        state.error = action.payload;
      });
  },
});

export default fileSlice.reducer;
