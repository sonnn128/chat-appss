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

export const fetchAllMembersOfChannel = createAsyncThunk(
  "channels/getAllMembersOfChannel",
  async (channelId) => await channelService.getAllMembersOfChannel(channelId)
);
export const addMembersToChannel = createAsyncThunk(
  "channels/addMembersToChannel",
  async ({channelId, userIds}) => await channelService.addMembersToChannel(channelId, userIds)
);