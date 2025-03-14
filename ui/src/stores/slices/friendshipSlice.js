import { createSlice } from "@reduxjs/toolkit";

import {
  fetchFriendList,
  fetchPendingRequests,
  sendFriendRequest,
} from "../middlewares/friendshipMiddleware";

const handlePending = (state) => {
  state.loading = true;
  state.error = null;
};

const handleRejected = (state, action) => {
  state.loading = false;
  state.error = action.payload;
};

const friendshipSlice = createSlice({
  name: "friendship",
  initialState: {
    currentFriend: null,
    friends: [],
    pendingRequests: [],
    loading: false,
    error: null,
  },
  reducers: {
    setCurrentFriend: (state, action) => {
      state.currentFriend = action.payload;
    },
    removeCurrentFriend: (state) => {
      state.currentFriend = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Friend List
      .addCase(fetchFriendList.pending, handlePending)
      .addCase(fetchFriendList.fulfilled, (state, action) => {
        state.loading = false;
        state.friends = action.payload;
      })
      .addCase(fetchFriendList.rejected, handleRejected)

      // Fetch Pending Requests
      .addCase(fetchPendingRequests.pending, handlePending)
      .addCase(fetchPendingRequests.fulfilled, (state, action) => {
        state.loading = false;
        state.pendingRequests = action.payload;
      })
      .addCase(fetchPendingRequests.rejected, handleRejected)

      // Send Friend Request
      .addCase(sendFriendRequest.fulfilled, (state, action) => {
        state.pendingRequests.push(action.payload);
      });
  },
});

export const { setCurrentFriend, removeCurrentFriend } = friendshipSlice.actions;
export default friendshipSlice.reducer;
