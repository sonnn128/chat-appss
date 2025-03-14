import React from "react";
import { CircularProgress } from "@mui/material";

function Loading() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh", // Đảm bảo chiếm toàn bộ chiều cao viewport
        backgroundColor: "#fff", // Giữ background trắng giống ChatSection
      }}
    >
      <CircularProgress
        size={40}
        thickness={4}
        sx={{
          color: "#1877f2", // Màu xanh của Messenger
        }}
      />
    </div>
  );
}

export default Loading;