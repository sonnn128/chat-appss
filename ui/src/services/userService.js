import { getAuthHeaders } from "../utils/authUtils";
import { get, put } from "../utils/httpRequest";

const USER_API = "/users"; // API quản lý người dùng

const getUserProfile = async () => get(`${USER_API}/me`, { headers: getAuthHeaders() });

const updateUserProfile = async (userData) =>
  put(`${USER_API}/profile`, userData, { headers: getAuthHeaders() });

const searchUsers = async (keyword) =>
  get(`${USER_API}/search?keyword=${keyword}`, { headers: getAuthHeaders() });

const getFriendSuggestions = async () => get(USER_API, { headers: getAuthHeaders() });

const checkUserOnline = async () => get(`${USER_API}/presence`, { headers: getAuthHeaders() });

const userService = {
  getUserProfile,
  updateUserProfile,
  searchUsers,
  getFriendSuggestions,
  checkUserOnline
};

export default userService;
