import { createAsyncThunk } from "@reduxjs/toolkit";
import channelService from "../../services/channelService";

const fetchCreateChannel = createAsyncThunk(
  "channels/createChannel",
  async (name, { rejectWithValue }) => {
    try {
      const response = await channelService.createChannel(name);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Error creating channel");
    }
  }
);

const fetchAllChannels = createAsyncThunk(
  "channels/fetchAllChannels", 
  async (_, { rejectWithValue }) => {
    try {
      const response = await channelService.getChannels();
      return response; 
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Error fetching all channels"
      );
    }
  }
);
export { fetchCreateChannel, fetchAllChannels };
