import React, { useRef, useEffect } from "react";
import { Avatar } from "@mui/material";

const ChatMessages = ({ selectedUser, getFullName }) => {
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
      <div className="flex flex-col gap-2">
        <div className="flex items-start">
          <Avatar
            sx={{ width: 32, height: 32 }}
            src={selectedUser.avatar || ""}
            alt={getFullName(selectedUser)}
          />
          <div className="ml-2 bg-gray-200 p-2 rounded-lg max-w-xs">
            <p className="text-sm text-gray-900">Xin chào! Bạn khỏe không?</p>
          </div>
        </div>
        <div className="flex items-start justify-end">
          <div className="bg-blue-500 p-2 rounded-lg max-w-xs text-white">
            <p className="text-sm">Tôi khỏe, cảm ơn bạn!</p>
          </div>
        </div>
      </div>
      <div ref={messagesEndRef} />
    </div>
  );
};

export default ChatMessages;
