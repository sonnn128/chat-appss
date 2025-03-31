import React, { useState } from "react";
import { useSelector } from "react-redux";
import ChatHeader from "@/components/chat/ChatHeader";
import ChatMessages from "@/components/chat/ChatMessages";
import ChatInput from "@/components/chat/ChatInput";
import AddMemberModal from "@/components/modals/AddMemberModal";

const ChatSection = () => {
  const selectedChannel = useSelector((state) => state.channel.currentChannel);
  const currentFriend = useSelector((state) => state.friendship.currentFriend);

  const [isMemberModalOpen, setIsMemberModalOpen] = useState(false);

  const getFullName = (user) =>
    user ? `${user.firstname} ${user.lastname}` : "Unknown User";

  const handleAddMember = () => setIsMemberModalOpen(true);
  const handleCloseMemberModal = () => setIsMemberModalOpen(false);

  const hasActiveChat = currentFriend || selectedChannel;
  const emptyChatMessage = (
    <div className="flex-1 flex items-center justify-center bg-gray-50">
      <p className="text-gray-500 text-lg">
        Select a chat or channel to start messaging
      </p>
    </div>
  );

  return (
    <div className="flex-1 flex flex-col bg-white relative">
      {hasActiveChat ? (
        <>
          <ChatHeader onAddMember={handleAddMember} />
          <ChatMessages getFullName={getFullName} />
          <ChatInput />
        </>
      ) : (
        emptyChatMessage
      )}
      <AddMemberModal
        open={isMemberModalOpen}
        onClose={handleCloseMemberModal}
      />
    </div>
  );
};

export default ChatSection;