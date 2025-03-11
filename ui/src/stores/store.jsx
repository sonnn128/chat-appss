// app/store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import channelReducer from './slices/channelSlice';

const store = configureStore({
    reducer: {
        auth: authReducer,
        channel: channelReducer
    },
});

export default store;
