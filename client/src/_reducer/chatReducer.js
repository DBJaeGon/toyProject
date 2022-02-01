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
});

export default chatSlice.reducer;
