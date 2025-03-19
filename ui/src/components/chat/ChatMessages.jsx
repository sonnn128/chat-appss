import React, { useRef, useEffect } from "react";
import { Avatar } from "@mui/material";
import { useSelector } from "react-redux";

const ChatMessages = ({ selectedUser, getFullName }) => {
  const messagesEndRef = useRef(null);
  const currentFriend = useSelector((state) => state.friendship.currentFriend);

  if (currentFriend) {
    console.log("currentFriend: ", currentFriend);
  }
  const { messagesOfCurrentChannel } = useSelector((state) => state.channel);
  
  const currentUserId = useSelector((state) => state.auth.user.id);
  console.log("messagesOfCurrentChannel: ", messagesOfCurrentChannel);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messagesOfCurrentChannel]);

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
        {messagesOfCurrentChannel &&
          messagesOfCurrentChannel.length &&
          messagesOfCurrentChannel.map((message) => (
            <React.Fragment key={message.timestamp}>
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
