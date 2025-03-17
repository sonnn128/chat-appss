// Import HTTP request helper và các toast messages
import axios from "axios";

const MESSAGE_API = "/messages";

// Lấy headers chứa token từ localStorage

const request = axios.create({
  baseURL: "http://localhost:8080/api/v1",
  timeout: 5000,
});

// Đăng nhập
const getAllMessagesOfChannel = async (channelId) => {
  try {
    const res = await request.get(`${MESSAGE_API}/${channelId}`, channelId);
    return res.data;
  } catch (error) {
    console.error("Error during login:", error);
    throw error;
  }
};


// Xuất các hàm để sử dụng
const messageServices = {
  getAllMessagesOfChannel,
};

export default messageServices;
