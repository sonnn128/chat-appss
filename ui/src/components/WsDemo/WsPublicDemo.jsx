import { Box, IconButton, Input } from "@mui/joy";
import React, { useState, useEffect } from "react";
import SentimentSatisfiedRoundedIcon from "@mui/icons-material/SentimentSatisfiedRounded";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import { stompClient } from "../../utils/ws";

function WsPublicDemo() {
  console.log("WsPublicDemo: ", WsPublicDemo);
  
  const [content, setContent] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    stompClient.onConnect = () => {
      stompClient.subscribe("/topic/public", (message) => {
        setMessages((prev) => [...prev, JSON.parse(message.body)]);
      });
    };

    stompClient.activate();

    return () => {
      stompClient.deactivate(); // Hủy kết nối khi component unmount
    };
  }, []);
  console.log("messages: ", messages);

  const handleSendMessage = () => {
    if (content.trim()) {
      stompClient.publish({
        destination: `/app/clientSend`,
        body: JSON.stringify(content),
      });

      setContent("");
    }
  };

  return (
    <div>
      <Box>
        <Input
          size="lg"
          startDecorator={<SentimentSatisfiedRoundedIcon />}
          endDecorator={
            <IconButton onClick={handleSendMessage}>
              <SendRoundedIcon />
            </IconButton>
          }
          onChange={(event) => setContent(event.target.value)}
          value={content}
          onKeyDown={(event) => {
            event.key === "Enter" && handleSendMessage();
          }}
        />
      </Box>

      {/* Hiển thị danh sách tin nhắn nhận được */}
      <Box>
        {messages.map((msg, index) => (
          <div key={index}>{msg}</div>
        ))}
      </Box>
    </div>
  );
}

export default WsPublicDemo;
