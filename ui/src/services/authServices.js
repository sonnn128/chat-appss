// Import HTTP request helper và các toast messages
import { getAuthHeaders } from "../utils/authUtils";
import request from "../utils/httpRequest";
import { errorToast, successToast } from "../utils/toast";

const AUTH_API = "/auth"; // Thêm biến này để dễ quản lý URL

// Lấy headers chứa token từ localStorage


// Đăng nhập
const login = async (credentials) => {
  try {
    const res = await request.post(`${AUTH_API}/login`, credentials);
    return res.data;
  } catch (error) {
    console.error("Error during login:", error);
    throw error;
  }
};

// Đăng ký
const register = async (userData) => {
  try {
    const res = await request.post(`${AUTH_API}/register`, userData);
    return res.data;
  } catch (error) {
    const errorResponse = error.response?.data || { message: "Registration failed" };
    errorToast(errorResponse.message);
    throw error;
  }
};

// Lấy thông tin người dùng từ `/me`
const getUserProfile = async () => {
  try {
    const res = await request.get(`${AUTH_API}/me`, {
      headers: getAuthHeaders(),
    });
    return res.data; // Giả sử API trả về `{ user: { ... } }`
  } catch (error) {
    console.error("Error fetching user profile:", error);
    throw error;
  }
};

// Đăng xuất
const logout = () => {
  localStorage.removeItem("token");
  successToast("Log out success");
};

// Xuất các hàm để sử dụng
const authServices = {
  login,
  register,
  getUserProfile,
  logout,
};

export default authServices;
