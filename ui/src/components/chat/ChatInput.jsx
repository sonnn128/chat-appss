import React, { useState } from "react";
import { TextField, IconButton, Tooltip } from "@mui/material";
import { Send } from "@mui/icons-material";
import { useSelector } from "react-redux";
import { stompClient } from "../../utils/ws";
import { errorToast } from "../../utils/toast";

const ChatInput = () => {
  const [message, setMessage] = useState("");
  const { currentChannelId } = useSelector((state) => state.channel);
  const { user } = useSelector((state) => state.auth);
  const handleSendMessage = () => {
    if (!currentChannelId) {
      errorToast("Please select a channel first");
      return;
    }
    if (message.trim()) {
      const messageSend = {
        key: { channelId: currentChannelId },
        userId: user.id,
        content: message,
        type: "CHAT",
        timestamp: Date.now(),
      };
      try {
        console.log("currentChannelId: ", currentChannelId);

        stompClient.publish({
          destination: `/app/channels/${currentChannelId}`,
          body: JSON.stringify(messageSend),
        });
        setMessage("");
      } catch (error) {
        console.error("Error sending message: ", error);
        errorToast("Failed to send message");
      }
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
