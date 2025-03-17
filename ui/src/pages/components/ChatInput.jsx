import React from "react";
import { TextField, IconButton, Tooltip } from "@mui/material";
import { Send } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { stompClient } from "../../utils/ws";

const ChatInput = ({ message, setMessage }) => {
  const { currentChannelId } = useSelector((state) => state.channel);
  const { user } = useSelector((state) => state.auth);

  const handleSendMessage = () => {
    if (message.trim()) {
      const messageSend = {
        key: { channelId: currentChannelId },
        userId: user.id,
        content: message,
        type: "CHAT",
        timestamp: Date.now(),
      };

      // Chỉ gửi tin nhắn, không subscribe ở đây
      stompClient.publish({
        destination: `/app/channels/${currentChannelId}`,
        body: JSON.stringify(messageSend),
      });
      setMessage("");
    }
  };

  return (
    <div className="p-3 border-t flex items-center bg-white">
      <TextField
        variant="outlined"
        fullWidth
        placeholder="Aa"
        size="small"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
        sx={{
          "& .MuiOutlinedInput-root": {
            borderRadius: "9999px",
            backgroundColor: "#f0f2f5",
            "& fieldset": { border: "none" },
          },
        }}
      />
      <Tooltip title="Send" arrow>
        <IconButton color="primary" onClick={handleSendMessage} sx={{ ml: 1 }}>
          <Send />
        </IconButton>
      </Tooltip>
    </div>
  );
};

export default ChatInput;