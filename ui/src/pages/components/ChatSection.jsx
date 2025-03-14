import React, { useState } from "react";
import { useSelector } from "react-redux";
import ChatHeader from "./ChatHeader";
import ChatMessages from "./ChatMessages";
import ChatInput from "./ChatInput";
import { motion } from "framer-motion";
import { infoToast } from "../../utils/toast";
import FriendListAddMember from "../../components/FriendListAddMember";

function ChatSection() {
  const selectedChannel = useSelector((state) => state.channel.currentChannel);
  const { currentFriend } = useSelector((state) => state.friendship);

  const [message, setMessage] = useState("");
  const [isMemberSidebarOpen, setIsMemberSidebarOpen] = useState(false); 

  const handleSendMessage = () => {
    if (message.trim()) {
      infoToast("Tin nhắn gửi:" + message);
      setMessage("");
    }
  };

  const handleAddFriend = async () => {
    infoToast("handleAddFriend");
  };

  const handleCancelRequest = () => {
    if (currentFriend) {
      infoToast("handleCancelRequest");
    }
  };

  const handleOpenProfile = () => setOpenProfile(true);

  const getFullName = (user) => {
    return user ? `${user.firstname} ${user.lastname}` : "";
  };

  // Hàm xử lý khi click vào "Add Member"
  const onAddMember = () => {
    setIsMemberSidebarOpen(true); // Mở sidebar bên phải
  };

  // Hàm đóng sidebar
  const closeMemberSidebar = () => {
    setIsMemberSidebarOpen(false);
  };

  return (
    <div className="flex-1 flex flex-col bg-white relative">
      {currentFriend || selectedChannel ? (
        <>
          <ChatHeader
            onOpenProfile={handleOpenProfile}
            onAddFriend={handleAddFriend}
            onCancelRequest={handleCancelRequest}
            onAddMember={onAddMember} // Truyền hàm onAddMember
          />
          <ChatMessages
            currentFriend={currentFriend}
            selectedChannel={selectedChannel}
            getFullName={getFullName}
          />
          <ChatInput
            message={message}
            setMessage={setMessage}
            onSendMessage={handleSendMessage}
          />
        </>
      ) : (
        <div className="flex-1 flex items-center justify-center bg-gray-50">
          <p className="text-gray-500 text-lg">
            Select a chat or channel to start messaging
          </p>
        </div>
      )}

      {/* Right sightbar */}
      {isMemberSidebarOpen && (
        <motion.div
          initial={{ x: 300 }} // Bắt đầu từ bên phải
          animate={{ x: 0 }} // Di chuyển vào vị trí
          exit={{ x: 300 }} // Thoát ra bên phải
          transition={{ type: "spring", stiffness: 100 }}
          className="absolute top-0 right-0 w-80 h-full bg-white border-l shadow-lg flex flex-col p-4"
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Friends List</h3>
            <button
              onClick={closeMemberSidebar}
              className="text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          </div>
          <div className="flex-1">
            <FriendListAddMember />
          </div>
        </motion.div>
      )}
    </div>
  );
}

export default ChatSection;
