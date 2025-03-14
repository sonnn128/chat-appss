// app/store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import channelReducer from './slices/channelSlice';
import friendshipReducer from './slices/friendshipSlice';
import messageReducer from './slices/messageSlice';

const store = configureStore({
    reducer: {
        auth: authReducer,
        channel: channelReducer,
        friendship: friendshipReducer,
        message: messageReducer
    },
});

export default store;
