import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";

export const fetchChatUpload = createAsyncThunk(
  "chat/upload",
  async (file, { rejectWithValue, requestId }) => {
    try {
      const formData = new FormData();
      formData.append("chatUpload", file);
      // const { data } = await axios.post("/api/chat/file", formData);
      // console.log(data);
    } catch (error) {
      rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  message: [],
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    addMsg(state, action) {
      state.message.push(action.payload);
    },
    signOutMsg(state, action) {
      state.message = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchChatUpload.pending, (state, action) => {})
      .addCase(fetchChatUpload.fulfilled, (state, action) => {})
      .addCase(fetchChatUpload.rejected, (state, action) => {});
  },
});

export const { addMsg, signOutMsg } = chatSlice.actions;
export default chatSlice.reducer;
