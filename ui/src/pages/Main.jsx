import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import friendshipService from "../services/friendshipService";
import userService from "../services/userService";
import Sidebar from "./components/Sidebar";
import ChatHeader from "./components/ChatHeader";
import ChatMessages from "./components/ChatMessages";
import ChatInput from "./components/ChatInput";
import ProfileModal from "./components/ProfileModal";
import FriendRequestsModal from "./components/FriendRequestsModal";

function Main() {
  const user = useSelector((state) => state.auth.user);
  const userId = user ? user.id : localStorage.getItem("userId");
  const [search, setSearch] = useState("");
  const [friends, setFriends] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [message, setMessage] = useState("");
  const [openProfile, setOpenProfile] = useState(false);
  const [friendRequestSent, setFriendRequestSent] = useState(false);
  const [openFriendRequests, setOpenFriendRequests] = useState(false);

  // Lấy danh sách bạn bè
  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const data = await friendshipService.getFriendList(userId);
        setFriends(data);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách bạn bè:", error);
      }
    };
    fetchFriends();
  }, [userId]);

  // Xử lý tìm kiếm
  useEffect(() => {
    const handleSearch = async () => {
      if (search.trim() === "") {
        setSearchResults([]);
        return;
      }
      try {
        const results = await userService.searchUsers(search);
        setSearchResults(results);
      } catch (error) {
        console.error("Lỗi khi tìm kiếm:", error);
      }
    };
    const debounce = setTimeout(handleSearch, 300);
    return () => clearTimeout(debounce);
  }, [search]);

  // Chọn người dùng để chat
  const handleSelectUser = (user) => {
    setSelectedUser(user);
    setSearch("");
    setSearchResults([]);
    setFriendRequestSent(false);
  };

  // Gửi tin nhắn
  const handleSendMessage = () => {
    if (message.trim()) {
      console.log("Tin nhắn gửi:", message);
      setMessage("");
    }
  };

  // Thêm bạn
  const handleAddFriend = async () => {
    if (selectedUser) {
      try {
        await friendshipService.sendFriendRequest(userId, selectedUser.id);
        setFriendRequestSent(true);
      } catch (error) {
        console.error("Lỗi khi gửi yêu cầu kết bạn:", error);
      }
    }
  };

  // Hủy yêu cầu kết bạn
  const handleCancelRequest = () => {
    if (selectedUser) {
      console.log("Hủy yêu cầu kết bạn với:", getFullName(selectedUser));
      setFriendRequestSent(false);
    }
  };

  // Gọi thoại
  const handleCall = () => {
    if (selectedUser) {
      console.log("Gọi thoại tới:", getFullName(selectedUser));
    }
  };

  // Gọi video
  const handleVideoCall = () => {
    if (selectedUser) {
      console.log("Gọi video tới:", getFullName(selectedUser));
    }
  };

  // Mở/đóng profile modal
  const handleOpenProfile = () => setOpenProfile(true);
  const handleCloseProfile = () => setOpenProfile(false);

  // Mở/đóng friend requests modal
  const handleOpenFriendRequests = () => setOpenFriendRequests(true);
  const handleCloseFriendRequests = () => setOpenFriendRequests(false);

  // Ghép First Name và Last Name
  const getFullName = (user) => {
    return user ? `${user.firstname} ${user.lastname}` : "";
  };

  return (
    <div className="flex h-screen bg-gray-100 font-sans antialiased overflow-hidden">
      <Sidebar
        search={search}
        setSearch={setSearch}
        friends={friends}
        searchResults={searchResults}
        onSelectUser={handleSelectUser}
        onOpenFriendRequests={handleOpenFriendRequests}
      />
      <div className="flex-1 flex flex-col bg-white">
        {selectedUser ? (
          <>
            <ChatHeader
              selectedUser={selectedUser}
              friendRequestSent={friendRequestSent}
              onOpenProfile={handleOpenProfile}
              onAddFriend={handleAddFriend}
              onCancelRequest={handleCancelRequest}
              onCall={handleCall}
              onVideoCall={handleVideoCall}
              getFullName={getFullName}
            />
            <ChatMessages selectedUser={selectedUser} getFullName={getFullName} />
            <ChatInput
              message={message}
              setMessage={setMessage}
              onSendMessage={handleSendMessage}
            />
            <ProfileModal
              open={openProfile}
              onClose={handleCloseProfile}
              user={selectedUser}
              getFullName={getFullName}
            />
            <FriendRequestsModal
              open={openFriendRequests}
              onClose={handleCloseFriendRequests}
            />
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center bg-gray-50">
            <p className="text-gray-500 text-lg">
              Select a chat to start messaging
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Main;