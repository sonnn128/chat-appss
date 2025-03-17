import React, { useRef, useEffect } from "react";
import { Avatar } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllMessageOfChannel } from "../../stores/middlewares/messageMiddleware";

const ChatMessages = ({ selectedUser, getFullName }) => {
  const dispatch = useDispatch();
  const messagesEndRef = useRef(null);

  // Selectors
  const currentFriend = useSelector((state) => state.friendship.currentFriend);

  if (currentFriend) {
    console.log("currentFriend: ", currentFriend);
  }

  const { currentChannelId } = useSelector((state) => state.channel);
  const { messages } = useSelector((state) => state.message);
  const currentUserId = useSelector((state) => state.auth.user.id);

  // Fetch messages when channel changes
  useEffect(() => {
    if (currentChannelId) {
      dispatch(fetchAllMessageOfChannel(currentChannelId));
    }
  }, [currentChannelId, dispatch]);

  // Scroll to bottom when messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Message rendering components
  const NoticeMessage = ({ message }) => (
    <div className="flex justify-center my-2">
      <div className="bg-gray-200 text-gray-700 text-xs px-3 py-1 rounded-full">
        {message.content}
      </div>
    </div>
  );

  const UserMessage = ({ message, isCurrentUser }) => (
    <div className={`flex items-start ${isCurrentUser ? "justify-end" : ""}`}>
      {!isCurrentUser && (
        <Avatar
          sx={{ width: 32, height: 32 }}
          alt={getFullName(selectedUser)}
        />
      )}
      <div
        className={`${
          isCurrentUser
            ? "bg-blue-500 text-white"
            : "bg-gray-200 text-gray-900 ml-2"
        } p-2 rounded-lg max-w-xs`}
      >
        <p className="text-sm">{message.content}</p>
      </div>
    </div>
  );
  return (
    <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
      <div className="flex flex-col gap-2">
        {messages.length &&
          messages.map((message) => (
            <React.Fragment key={message.key.messageId}>
              {message.type === "NOTICE" ? (
                <NoticeMessage message={message} />
              ) : (
                <UserMessage
                  message={message}
                  isCurrentUser={message.userId === currentUserId}
                />
              )}
            </React.Fragment>
          ))}
      </div>
      <div ref={messagesEndRef} />
    </div>
  );
};

export default ChatMessages;
