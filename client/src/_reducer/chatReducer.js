import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const fetchChatSend = createAsyncThunk("chat/sand", async (msg, { rejectWithValue, requestId }) => {
  try {
  } catch (error) {
    rejectWithValue(error.response.data);
  }
});

const initialState = {};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchChatSend.pending, (state, action) => {})
      .addCase(fetchChatSend.fulfilled, (state, action) => {})
      .addCase(fetchChatSend.rejected, (state, action) => {});
  },
});

export default chatSlice.reducer;
