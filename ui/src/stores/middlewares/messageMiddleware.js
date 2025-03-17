import { createAsyncThunk } from "@reduxjs/toolkit";
import messageServices from "../../services/messageService";


export const fetchAllMessageOfChannel = createAsyncThunk(
  "fetchAllMessageOfChannel",
  async (channelId) => await messageServices.getAllMessagesOfChannel(channelId)
);
export const getAllMembersOfChannel = createAsyncThunk(
  "getAllMembersOfChannel",
  async (channelId) => await messageServices.getAllMembersOfChannel(channelId)
);
