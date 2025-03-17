import React, { useState, useEffect } from "react"; // Thêm useEffect
import { useSelector, useDispatch } from "react-redux"; // Thêm useDispatch
import ChatHeader from "./ChatHeader";
import ChatMessages from "./ChatMessages";
import ChatInput from "./ChatInput";
import { motion } from "framer-motion";
import { infoToast } from "../../utils/toast";
import FriendListAddMember from "../../components/FriendListAddMember";
import { stompClient } from "../../utils/ws"; // Thêm stompClient
import { setMessages } from "../../stores/slices/messageSlice"; // Thêm setMessages

function ChatSection() {
  const dispatch = useDispatch(); // Thêm dispatch
  const selectedChannel = useSelector((state) => state.channel.currentChannel);
  const { currentChannelId } = useSelector((state) => state.channel); // Thêm currentChannelId
  const { currentFriend } = useSelector((state) => state.friendship);

  const [message, setMessage] = useState("");
  const [isMemberSidebarOpen, setIsMemberSidebarOpen] = useState(false);

  // Thiết lập subscription khi kênh thay đổi
  useEffect(() => {
    if (currentChannelId && stompClient) {
      const subscription = stompClient.subscribe(
        `/channels/${currentChannelId}`,
        (message) => {
          dispatch(setMessages(JSON.parse(message.body)));
        }
      );

      // Hủy subscription khi component unmount hoặc kênh thay đổi
      return () => {
        subscription.unsubscribe();
      };
    }
  }, [currentChannelId, dispatch]);

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
          <ChatInput message={message} setMessage={setMessage} />
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