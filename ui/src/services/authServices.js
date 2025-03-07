import request from '../utils/httpRequest';
import { successToast } from '../utils/toast';

const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    return { Authorization: `Bearer ${token}` };
};

// login

const login = async (credentials) => {
    try {
        const res = await request.post(`auth/login`, credentials);
        localStorage.setItem('token', res.data.data.accessToken);
        return res.data;
    } catch (error) {
        console.error('Error during login:', error);
        throw error;
    }
};

// Đăng ký
const register = async (userData) => {
    try {
        const res = await request.post(`auth/register`, userData);
        return res.data;
    } catch (error) {
        console.error('Error during registration:', error);
        throw error;
    }
};

// Lấy thông tin người dùng
const getUserProfile = async () => {
    try {
        const res = await request.get(`${AUTH_API}/profile`, {
            headers: getAuthHeaders(),
        });
        return res.data.data;
    } catch (error) {
        console.error('Error fetching user profile:', error);
        throw error;
    }
};

// Đăng xuất
const logout = () => {
    // Xóa token khỏi localStorage
    localStorage.removeItem('token');
    successToast('Log out success');
};

// Auth Services
const authServices = {
    login,
    register,
    getUserProfile,
    logout,
};

export default authServices;
