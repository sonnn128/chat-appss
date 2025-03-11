import { getAuthHeaders } from "../utils/authUtils";
import request from "../utils/httpRequest";
import { errorToast, successToast } from "../utils/toast";

// API endpoint
const FRIENDSHIP_API = "/friendships";

// Gửi lời mời kết bạn
const sendFriendRequest = async (senderId, receiverId) => {
  try {
    const res = await request.post(
      `${FRIENDSHIP_API}/request?senderId=${senderId}&receiverId=${receiverId}`,
      {},
      { headers: getAuthHeaders() }
    );
    successToast(res.data.message);
    return res.data;
  } catch (error) {
    errorToast(
      error.response?.data?.message || "Không thể gửi lời mời kết bạn!"
    );
    throw error;
  }
};

// Chấp nhận lời mời kết bạn
const acceptFriendRequest = async (requestId) => {
  try {
    const res = await request.post(
      `${FRIENDSHIP_API}/accept?requestId=${requestId}`,
      {},
      { headers: getAuthHeaders() }
    );
    successToast(res.data.message);
    return res.data;
  } catch (error) {
    errorToast(error.response?.data?.message || "Không thể chấp nhận lời mời!");
    throw error;
  }
};

// Từ chối lời mời kết bạn
const rejectFriendRequest = async (requestId) => {
  try {
    const res = await request.post(
      `${FRIENDSHIP_API}/reject?requestId=${requestId}`,
      {},
      { headers: getAuthHeaders() }
    );
    successToast(res.data.message);
    return res.data;
  } catch (error) {
    errorToast(error.response?.data?.message || "Không thể từ chối lời mời!");
    throw error;
  }
};

// Lấy danh sách bạn bè
const getFriendList = async (userId) => {
  console.log("getAuthHeaders(): ", getAuthHeaders());

  try {
    const res = await request.get(`${FRIENDSHIP_API}/list?userId=${userId}`, {
      headers: getAuthHeaders(),
    });
    console.log("Res: ", res);
    return res.data.data;
  } catch (error) {
    errorToast(
      error.response?.data?.message || "Không thể lấy danh sách bạn bè!"
    );
    throw error;
  }
};

// Lấy danh sách yêu cầu kết bạn
const getPendingRequests = async (userId) => {
  try {
    const res = await request.get(
      `${FRIENDSHIP_API}/requests?userId=${userId}`,
      { headers: getAuthHeaders() }
    );
    return res.data.data;
  } catch (error) {
    errorToast(
      error.response?.data?.message ||
        "Không thể lấy danh sách yêu cầu kết bạn!"
    );
    throw error;
  }
};

// Hủy kết bạn
const unfriendUser = async (userId, friendId) => {
  try {
    const res = await request.delete(
      `${FRIENDSHIP_API}/unfriend?userId=${userId}&friendId=${friendId}`,
      { headers: getAuthHeaders() }
    );
    successToast(res.data.message);
    return res.data;
  } catch (error) {
    errorToast(error.response?.data?.message || "Không thể hủy kết bạn!");
    throw error;
  }
};

// Xuất các hàm
const friendshipService = {
  sendFriendRequest,
  acceptFriendRequest,
  rejectFriendRequest,
  getFriendList,
  getPendingRequests,
  unfriendUser,
};

export default friendshipService;
