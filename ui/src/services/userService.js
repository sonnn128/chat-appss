import { getAuthHeaders } from "../utils/authUtils";
import request from "../utils/httpRequest";
import { errorToast } from "../utils/toast";

const USER_API = "/users"; // API quản lý người dùng

// Lấy thông tin người dùng
const getUserProfile = async () => {
  try {
    const res = await request.get(`${USER_API}/me`, {
      headers: getAuthHeaders(),
    });
    return res.data;
  } catch (error) {
    errorToast("Failed to fetch user profile");
    throw error;
  }
};
const updateUserProfile = async (userData) => {
  try {
    const res = await request.put(`${USER_API}/profile`, userData, {
      headers: getAuthHeaders(),
    });

    console.log("Updated user response:", res.data);
    return res.data;
  } catch (error) {
    console.error("Error updating profile:", error);
    errorToast("Failed to update profile");
    console.log("Error: ", error);

    throw error;
  }
};
// Xuất các hàm
const userService = { getUserProfile, updateUserProfile };
export default userService;
