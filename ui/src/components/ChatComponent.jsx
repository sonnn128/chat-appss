import React, { useState, useEffect, useRef } from "react";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";

function ChatComponent() {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const stompClient = useRef(null); 

  useEffect(() => {
    // Khởi tạo STOMP client
    stompClient.current = new Client({
      webSocketFactory: () => new SockJS("http://localhost:8080/ws"),
      brokerURL: "ws://localhost:8080/ws", // Địa chỉ WebSocket của Spring Boot server
      connectHeaders: {
        // authentication
      },
      debug: (str) => {
        console.log(str);
      },
      onConnect: () => {
        // Subscribe sau khi kết nối
        stompClient.current.subscribe("/topic/messages", (messageOutput) => {
          setMessages((prevMessages) => [...prevMessages, messageOutput.body]);
        });
      },
      onDisconnect: () => {
        console.log("Disconnected from WebSocket");
      },
    });

    // Kích hoạt client
    stompClient.current.activate();

    // Dọn dẹp khi component bị unmount
    return () => {
      stompClient.current.deactivate();
    };
  }, []);

  const sendMessage = () => {
    // Kiểm tra xem stomp client có kết nối và client có hỗ trợ send không
    if (message && stompClient.current && stompClient.current.connected) {
      stompClient.current.publish({
        destination: "/app/sendMessage", // Địa chỉ gửi tin nhắn tới
        body: message, // Nội dung tin nhắn
      });
      setMessage(""); // Xóa nội dung input sau khi gửi
    }
  };

  return (
    <div>
      <h2>Chat</h2>
      <div>
        {messages.map((msg, index) => (
          <p key={index}>{msg}</p>
        ))}
      </div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Enter message"
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}

export default ChatComponent;
