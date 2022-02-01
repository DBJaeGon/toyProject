import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchMainImage = createAsyncThunk(
  "image/main",
  async (_, { rejectWithValue, getState, requestId }) => {
    try {
      const { main } = getState().image;
      if (!main.isLoading || main.currentRequestId !== requestId) return;
      const result = await axios.get("/api/image/main");
      return result.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchImages = createAsyncThunk(
  "image/images",
  async (_, { rejectWithValue, getState, requestId }) => {
    try {
      const { images } = getState().image;
      if (!images.isLoading || images.currentRequestId !== requestId) return;
      const result = await axios.get("/api/image/images");
      return result.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchMainImageDel = createAsyncThunk(
  "image/delete",
  async (fileName, { rejectWithValue }) => {
    try {
      const result = await axios.delete(`/api/image/main/${fileName}`);
      return result.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  main: {
    isLoading: false,
    currentRequestId: undefined,
    previewVisible: false,
    previewImage: "",
    previewTitle: "",
    imageInfo: [],
    errorMessage: "",
  },
  images: {
    isLoading: false,
    currentRequestId: undefined,
    previewVisible: false,
    previewImage: "",
    previewTitle: "",
    imageInfo: [],
    errorMessage: "",
  },
};

const imageSlice = createSlice({
  name: "image",
  initialState,
  reducers: {
    removeFile(state, action) {
      state.main.imageInfo = state.main.imageInfo.filter((file) => {
        return file.uid !== action.payload;
      });
    },
    previewFile(state, action) {
      if (action.payload.previewImage && action.payload.previewTitle) {
        state.main.previewImage = action.payload.previewImage;
        state.main.previewTitle = action.payload.previewTitle;
      }
      state.main.previewVisible = action.payload.previewVisible;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMainImage.pending, (state, action) => {
        if (!state.main.isLoading) {
          state.main.isLoading = true;
          state.main.currentRequestId = action.meta.requestId;
        }
      })
      .addCase(fetchMainImage.fulfilled, (state, action) => {
        if (state.main.isLoading && state.main.currentRequestId === action.meta.requestId) {
          state.main.isLoading = false;
          state.main.currentRequestId = undefined;
          state.main.imageInfo = action.payload;
        }
      })
      .addCase(fetchMainImage.rejected, (state, action) => {
        if (state.main.isLoading && state.main.currentRequestId === action.meta.currentRequestId) {
          state.main.isLoading = false;
          state.main.currentRequestId = undefined;
          state.main.errorMessage = action.payload.message;
        }
      });
    builder
      .addCase(fetchImages.pending, (state, action) => {
        if (!state.images.isLoading) {
          state.images.isLoading = true;
          state.images.currentRequestId = action.meta.requestId;
        }
      })
      .addCase(fetchImages.fulfilled, (state, action) => {
        if (state.images.isLoading && state.images.currentRequestId === action.meta.requestId) {
          state.images.isLoading = false;
          state.images.currentRequestId = undefined;
          state.images.imageInfo = action.payload;
        }
      })
      .addCase(fetchImages.rejected, (state, action) => {
        if (
          state.images.isLoading &&
          state.images.currentRequestId === action.meta.currentRequestId
        ) {
          state.images.isLoading = false;
          state.images.currentRequestId = undefined;
          state.images.errorMessage = action.payload.message;
        }
      });
  },
});

export const { addFile, removeFile, previewFile } = imageSlice.actions;
export default imageSlice.reducer;
