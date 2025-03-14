import { createAsyncThunk } from "@reduxjs/toolkit";
import friendshipService from "../../services/friendshipService";

// Lấy danh sách bạn bè
const fetchFriendList = createAsyncThunk(
  "friendship/fetchFriendList",
  async (userId, { rejectWithValue }) => {
    try {
      const data = await friendshipService.getFriendList(userId);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Error fetching friends");
    }
  }
);

// Lấy danh sách yêu cầu kết bạn
const fetchPendingRequests = createAsyncThunk(
  "friendship/fetchPendingRequests",
  async (userId, { rejectWithValue }) => {
    try {
      const data = await friendshipService.getPendingRequests(userId);
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Error fetching pending requests"
      );
    }
  }
);

// Gửi yêu cầu kết bạn
const sendFriendRequest = createAsyncThunk(
  "friendship/sendFriendRequest",
  async ({ userId, friendId }, { rejectWithValue }) => {
    try {
      await friendshipService.sendFriendRequest(userId, friendId);
      return { userId, friendId }; // Trả về dữ liệu nếu cần
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Error sending friend request"
      );
    }
  }
);

export { fetchFriendList, fetchPendingRequests, sendFriendRequest };
