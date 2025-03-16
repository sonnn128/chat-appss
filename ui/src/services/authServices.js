import { getAuthHeaders } from "../utils/authUtils";
import { get, post } from "../utils/httpRequest";
import { successToast } from "../utils/toast";

const AUTH_API = "/auth"; // Biến URL chung cho dễ quản lý

const login = async (credentials) => post(`${AUTH_API}/login`, credentials);

const register = async (userData) => post(`${AUTH_API}/register`, userData);

const getUserProfile = async () =>
  get(`${AUTH_API}/me`, { headers: getAuthHeaders() });

const logout = () => {
  localStorage.removeItem("token");
  successToast("Log out success");
};

const authServices = {
  login,
  register,
  getUserProfile,
  logout,
};

export default authServices;
