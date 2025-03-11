import React from "react";
import { TextField, IconButton, Tooltip } from "@mui/material";
import { Send } from "@mui/icons-material";

const ChatInput = ({ message, setMessage, onSendMessage }) => {
  return (
    <div className="p-3 border-t flex items-center bg-white">
      <TextField
        variant="outlined"
        fullWidth
        placeholder="Aa"
        size="small"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyPress={(e) => e.key === "Enter" && onSendMessage()}
        sx={{
          "& .MuiOutlinedInput-root": {
            borderRadius: "9999px",
            backgroundColor: "#f0f2f5",
            "& fieldset": { border: "none" },
          },
        }}
      />
      <Tooltip title="Send" arrow>
        <IconButton color="primary" onClick={onSendMessage} sx={{ ml: 1 }}>
          <Send />
        </IconButton>
      </Tooltip>
    </div>
  );
};

export default ChatInput;
