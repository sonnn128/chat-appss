import React from "react";
import { CircularProgress } from "@mui/material";

function Loading() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#fff",
      }}
    >
      <CircularProgress
        size={40}
        thickness={4}
        sx={{
          color: "#1877f2",
        }}
      />
    </div>
  );
}

export default Loading;
