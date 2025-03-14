import { createAsyncThunk } from '@reduxjs/toolkit';
import messageServices from '../../services/messageService';

export const fetchAllMessageOfChannel = createAsyncThunk('fetchAllMessageOfChannel', async (id) => {
    const messages = await messageServices.getAllMessagesOfChannel(id);
    return messages;
});
