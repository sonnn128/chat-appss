import { getAuthHeaders } from "../utils/authUtils";
import { get, post } from "../utils/httpRequest";

const CHANNEL_API = "/channels"; // Base URL cho các API liên quan đến channel

// Tạo channel mới
const createChannel = async (name) =>
  post(CHANNEL_API, { name }, { headers: getAuthHeaders() });

// Lấy danh sách tất cả các channel
const getChannels = async () =>
  get(CHANNEL_API, { headers: getAuthHeaders() });

// Lấy thông tin chi tiết của một channel
const getChannelById = async (channelId) =>
  get(`${CHANNEL_API}/${channelId}`, { headers: getAuthHeaders() });

// Lấy danh sách tất cả thành viên của một channel
const getAllMembers = async (channelId) =>
  get(`${CHANNEL_API}/${channelId}/members`, { headers: getAuthHeaders() });

// Xuất các hàm để sử dụng
const channelService = {
  createChannel,
  getChannels,
  getChannelById,
  getAllMembers,
};

export default channelService;
