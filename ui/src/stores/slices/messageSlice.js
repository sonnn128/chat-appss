import { createSlice } from "@reduxjs/toolkit";
import { fetchAllMessageOfChannel } from "../middlewares/messageMiddleware";

const initialState = {
  messages: [],
  status: "idle",
};

const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    setMessages: (state, action) => {
      state.messages.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllMessageOfChannel.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllMessageOfChannel.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.messages = action.payload;
      })
      .addCase(fetchAllMessageOfChannel.rejected, (state, action) => {
        state.status = "failed";
      });
  },
});

export const { setMessages } = messageSlice.actions;

export default messageSlice.reducer;
