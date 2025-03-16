import { createAsyncThunk } from "@reduxjs/toolkit";
import messageServices from "../../services/messageService";

export const fetchAllMessageOfChannel = createAsyncThunk(
  "fetchAllMessageOfChannel",
  async (channelId) => await messageServices.getAllMessagesOfChannel(channelId)
);
