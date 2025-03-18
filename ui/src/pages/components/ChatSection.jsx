import React, { useState } from "react"; // Thêm useEffect
import { useSelector } from "react-redux"; // Thêm useDispatch
import ChatHeader from "./ChatHeader";
import ChatMessages from "./ChatMessages";
import ChatInput from "./ChatInput";
import { motion } from "framer-motion";
import { infoToast } from "../../utils/toast";
import FriendListAddMember from "../../components/FriendListAddMember";

function ChatSection() {
  const selectedChannel = useSelector((state) => state.channel.currentChannel);
  const { currentFriend } = useSelector((state) => state.friendship);

  const [isMemberSidebarOpen, setIsMemberSidebarOpen] = useState(false);

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

  const onAddMember = () => {
    setIsMemberSidebarOpen(true);
  };

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
            onAddMember={onAddMember}
          />
          <ChatMessages
            currentFriend={currentFriend}
            selectedChannel={selectedChannel}
            getFullName={getFullName}
          />
          <ChatInput />
        </>
      ) : (
        <div className="flex-1 flex items-center justify-center bg-gray-50">
          <p className="text-gray-500 text-lg">
            Select a chat or channel to start messaging
          </p>
        </div>
      )}

      {isMemberSidebarOpen && (
        <motion.div
          initial={{ x: 300 }}
          animate={{ x: 0 }}
          exit={{ x: 300 }}
          transition={{ type: "spring", stiffness: 100 }}
          className="absolute top-0 right-0 w-80 h-full bg-white border-l shadow-lg flex flex-col p-4"
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-800">
              Friends List
            </h3>
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
