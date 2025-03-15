import React, { useRef, useEffect } from "react";
import { Avatar } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllMessageOfChannel } from "../../stores/middlewares/messageMiddleware";

const ChatMessages = ({ selectedUser, getFullName }) => {
  const dispatch = useDispatch();
  const { currentChannelId } = useSelector((state) => state.channel);
  const { messages } = useSelector((state) => state.message);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (currentChannelId) {
      dispatch(fetchAllMessageOfChannel(currentChannelId));
    }
  }, [currentChannelId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Lọc tin nhắn trùng lặp nếu cần
  const uniqueMessages = Array.from(
    new Map(messages.map((msg) => [msg.key.messageId, msg])).values()
  );

  return (
    <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
      <div className="flex flex-col gap-2">
        <div className="flex items-start">
          <Avatar
            sx={{ width: 32, height: 32 }}
            alt={getFullName(selectedUser)}
          />
          <div className="ml-2 bg-gray-200 p-2 rounded-lg max-w-xs">
            <p className="text-sm text-gray-900">Xin chào! Bạn khỏe không?</p>
          </div>
        </div>
        {uniqueMessages.length > 0
          ? uniqueMessages.map((message) =>
              message.type === "NOTICE" ? (
                <div
                  key={message.key.messageId} // Thêm key ở đây
                  className="flex justify-center my-2"
                >
                  <div className="bg-gray-200 text-gray-700 text-xs px-3 py-1 rounded-full">
                    {message.content}
                  </div>
                </div>
              ) : (
                <div
                  key={message.key.messageId}
                  className="flex items-start justify-end"
                >
                  <div className="bg-blue-500 p-2 rounded-lg max-w-xs text-white">
                    <p className="text-sm">{message.content}</p>
                  </div>
                </div>
              )
            )
          : ""}
      </div>
      <div ref={messagesEndRef} />
    </div>
  );
};

export default ChatMessages;