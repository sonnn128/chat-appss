import { createSlice } from "@reduxjs/toolkit";
import {
  fetchCreateChannel,
  fetchAllChannels,
  fetchAllMembersOfChannel,
  addMembersToChannel,
} from "../middlewares/channelMiddleware";

const initialState = {
  channels: [],
  currentChannel: null,
  loading: false,
  error: null,
  currentChannelId: null,
  joinedChannels: [],
};

const channelSlice = createSlice({
  name: "channels",
  initialState,
  reducers: {
    createChannel: (state, action) => {
      state.channels.push(action.payload);
    },
    setChannels: (state, action) => {
      state.channels = action.payload;
    },
    selectChannel: (state, action) => {
      state.currentChannel = action.payload;
    },
    removeChannel: (state, action) => {
      state.channels = state.channels.filter(
        (channel) => channel.id !== action.payload
      );
      if (state.currentChannel?.id === action.payload) {
        state.currentChannel = null;
      }
    },
    removeCurrentChannel: (state) => {
      state.currentChannel = null;
    },
    setCurrentChannel: (state, action) => {
      state.currentChannel = action.payload;
      state.currentChannelId = action.payload.id;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCreateChannel.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCreateChannel.fulfilled, (state, action) => {
        state.loading = false;
        state.channels.push(action.payload);
        state.currentChannel = action.payload;
      })
      .addCase(fetchCreateChannel.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchAllChannels.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllChannels.fulfilled, (state, action) => {
        state.loading = false;
        state.channels = action.payload; // Cập nhật danh sách channels
      })
      .addCase(fetchAllChannels.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // fetchAllMembersOfChannel
      .addCase(fetchAllMembersOfChannel.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllMembersOfChannel.fulfilled, (state, action) => {
        state.loading = false;
        state.joinedChannels = action.payload;
      })
      .addCase(fetchAllMembersOfChannel.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // addMembersToChannel
      .addCase(addMembersToChannel.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addMembersToChannel.fulfilled, (state, action) => {
        state.loading = false;
        state.joinedChannels = action.payload;
      })
      .addCase(addMembersToChannel.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {
  createChannel,
  setChannels,
  selectChannel,
  removeChannel,
  removeCurrentChannel,
  setCurrentChannel,
} = channelSlice.actions;
export default channelSlice.reducer;
