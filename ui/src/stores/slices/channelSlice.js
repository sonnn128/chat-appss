import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import channelService from "../../services/channelService"; 

export const createChannelAsync = createAsyncThunk(
  "channels/createChannel",
  async (name, { rejectWithValue }) => {
    try {
      const response = await channelService.createChannel(name); // Gọi API tạo channel
      return response; // Trả về dữ liệu channel từ server
    } catch (error) {
      return rejectWithValue(error.response?.data || "Error creating channel");
    }
  }
);

// Khởi tạo state ban đầu
const initialState = {
  channels: [], // Danh sách channel
  selectedChannel: null, // Channel đang được chọn
  loading: false, // Trạng thái tải
  error: null, // Lỗi nếu có
};

// Tạo slice
const channelSlice = createSlice({
  name: "channels",
  initialState,
  reducers: {
    // Thêm channel mới (đồng bộ)
    createChannel: (state, action) => {
      state.channels.push(action.payload);
    },
    // Cập nhật danh sách channel
    setChannels: (state, action) => {
      state.channels = action.payload;
    },
    // Chọn channel
    selectChannel: (state, action) => {
      state.selectedChannel = action.payload;
    },
    // Xóa channel (nếu cần)
    removeChannel: (state, action) => {
      state.channels = state.channels.filter(
        (channel) => channel.id !== action.payload
      );
      if (state.selectedChannel?.id === action.payload) {
        state.selectedChannel = null;
      }
    },
  },
  extraReducers: (builder) => {
    // Xử lý createChannelAsync
    builder
      .addCase(createChannelAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createChannelAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.channels.push(action.payload); // Thêm channel mới từ server
        state.selectedChannel = action.payload; // Tự động chọn channel vừa tạo
      })
      .addCase(createChannelAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// Export actions
export const { createChannel, setChannels, selectChannel, removeChannel } =
  channelSlice.actions;

// Export reducer
export default channelSlice.reducer;
