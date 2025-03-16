import { createAsyncThunk } from "@reduxjs/toolkit";
import channelService from "../../services/channelService";

export const fetchCreateChannel = createAsyncThunk(
  "channels/createChannel",
  async (name) => await channelService.createChannel(name)
);

export const fetchAllChannels = createAsyncThunk(
  "channels/fetchAllChannels",
  async () => await channelService.getChannels()
);
