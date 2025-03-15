import { getAuthHeaders } from "../utils/authUtils";
import request from "../utils/httpRequest";
import { errorToast } from "../utils/toast";

const CHANNEL_API = "/channels"; // Base URL cho các API liên quan đến channel

// Tạo channel mới
const createChannel = async (name) => {
  try {
    const res = await request.post(
      CHANNEL_API,
      { name }, // Payload tương ứng với CreateChannelRequest trong backend
      {
        headers: getAuthHeaders(), // Thêm headers chứa token
      }
    );
    return res.data; // Trả về dữ liệu channel từ server
  } catch (error) {
    const errorResponse = error.response?.data || {
      message: "Failed to create channel",
    };
    errorToast(errorResponse.message);
    console.error("Error creating channel:", error);
    throw error;
  }
};
const getChannels = async () => {
  try {
    const res = await request.get(CHANNEL_API, {
      headers: getAuthHeaders(),
    });
    return res.data;
  } catch (error) {
    const errorResponse = error.response?.data || {
      message: "Failed to fetch channels",
    };
    errorToast(errorResponse.message);
    console.error("Error fetching channels:", error);
    throw error;
  }
};

// Lấy thông tin chi tiết của một channel (nếu cần)
const getChannelById = async (channelId) => {
  try {
    const res = await request.get(`${CHANNEL_API}/${channelId}`, {
      headers: getAuthHeaders(),
    });
    return res.data; // Giả sử API trả về thông tin channel
  } catch (error) {
    const errorResponse = error.response?.data || {
      message: "Failed to fetch channel",
    };
    errorToast(errorResponse.message);
    console.error("Error fetching channel:", error);
    throw error;
  }
};


const getAllMembers = async (channelId) => {
  try {
    const res = await request.get(`${CHANNEL_API}/${channelId}/members`, {
      headers: getAuthHeaders(),
    });
    return res.data; // Giả sử API trả về thông tin channel
  } catch (error) {
    const errorResponse = error.response?.data || {
      message: "Failed to fetch channel",
    };
    errorToast(errorResponse.message);
    console.error("Error fetching channel:", error);
    throw error;
  }
};



// Xuất các hàm để sử dụng
const channelService = {
  createChannel,
  getChannels,
  getChannelById,
  getAllMembers
};

export default channelService;
