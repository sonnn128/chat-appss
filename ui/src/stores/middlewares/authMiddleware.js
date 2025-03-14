import { createAsyncThunk } from '@reduxjs/toolkit';
import authServices from '../../services/authServices';

export const fetchUserProfile = createAsyncThunk('fetchUserProfile', async () => {
    const userProfile = await authServices.getUserProfile();
    return userProfile;
});

export const loginUser = createAsyncThunk('loginUser', async ({ email = '', password = '' }) => {
    const res = await authServices.login({
        email,
        password,
    });
    return res;
});


export const registerUser = createAsyncThunk('registerUser', async ({...registerData}) => {
    const res = await authServices.register({
        ...registerData
    });
    return res;
});