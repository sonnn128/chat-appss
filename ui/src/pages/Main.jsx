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
import FriendsModal from "./components/FriendsModal"; // Thêm FriendsModal

function Main() {
  const user = useSelector((state) => state.auth.user);
  const userId = user ? user.id : localStorage.getItem("userId");
  const [search, setSearch] = useState("");
  const [friends, setFriends] = useState([]);
  const [channels, setChannels] = useState([]);
  const [pendingRequests, setPendingRequests] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedChannel, setSelectedChannel] = useState(null);
  const [message, setMessage] = useState("");
  const [openProfile, setOpenProfile] = useState(false);
  const [friendRequestSent, setFriendRequestSent] = useState(false);
  const [openFriendRequests, setOpenFriendRequests] = useState(false);
  const [openFriends, setOpenFriends] = useState(false); // Thêm state cho FriendsModal

  // Lấy danh sách bạn bè
  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const data = await friendshipService.getFriendList(userId);
        console.log("data: ", data);
        
        setFriends(data);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách bạn bè:", error);
      }
    };
    fetchFriends();
  }, [userId]);

  // Lấy danh sách yêu cầu kết bạn
  const fetchPendingRequests = async () => {
    try {
      const data = await friendshipService.getPendingRequests(userId);
      setPendingRequests(data);
    } catch (error) {
      console.error("Lỗi khi lấy danh sách yêu cầu kết bạn:", error);
    }
  };

  useEffect(() => {
    fetchPendingRequests();
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

  const handleSelectUser = (user) => {
    setSelectedUser(user);
    setSelectedChannel(null);
    setSearch("");
    setSearchResults([]);
    setFriendRequestSent(false);
  };

  const handleSelectChannel = (channel) => {
    setSelectedChannel(channel);
    setSelectedUser(null);
  };

  const handleSendMessage = () => {
    if (message.trim()) {
      console.log("Tin nhắn gửi:", message);
      setMessage("");
    }
  };

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

  const handleCancelRequest = () => {
    if (selectedUser) {
      console.log("Hủy yêu cầu kết bạn với:", getFullName(selectedUser));
      setFriendRequestSent(false);
    }
  };

  const handleCall = () => {
    if (selectedUser) {
      console.log("Gọi thoại tới:", getFullName(selectedUser));
    }
  };

  const handleVideoCall = () => {
    if (selectedUser) {
      console.log("Gọi video tới:", getFullName(selectedUser));
    }
  };

  const handleNewChannel = async () => {
    const channelName = prompt("Enter channel name:");
    if (channelName && channelName.trim()) {
      try {
        const newChannel = await channelService.createChannel(channelName);
        setChannels((prev) => [...prev, newChannel]);
        setSelectedChannel(newChannel);
      } catch (error) {
        console.error("Lỗi khi tạo channel:", error);
      }
    }
  };

  const handleOpenProfile = () => setOpenProfile(true);
  const handleCloseProfile = () => setOpenProfile(false);

  const handleOpenFriendRequests = () => setOpenFriendRequests(true);
  const handleCloseFriendRequests = () => setOpenFriendRequests(false);

  const handleOpenFriends = () => setOpenFriends(true); // Hàm mở FriendsModal
  const handleCloseFriends = () => setOpenFriends(false); // Hàm đóng FriendsModal

  const handleRequestAction = () => {
    fetchPendingRequests();
    fetchFriends();
  };

  const getFullName = (user) => {
    return user ? `${user.firstname} ${user.lastname}` : "";
  };

  return (
    <div className="flex h-screen bg-gray-100 font-sans antialiased overflow-hidden">
      <Sidebar
        search={search}
        setSearch={setSearch}
        friends={friends}
        channels={channels}
        pendingRequests={pendingRequests}
        searchResults={searchResults}
        onSelectUser={handleSelectUser}
        onSelectChannel={handleSelectChannel}
        onNewChannel={handleNewChannel}
        onOpenFriendRequests={handleOpenFriendRequests}
        onOpenFriends={handleOpenFriends} // Truyền hàm mở FriendsModal
      />
      <div className="flex-1 flex flex-col bg-white">
        {selectedUser || selectedChannel ? (
          <>
            <ChatHeader
              selectedUser={selectedUser}
              selectedChannel={selectedChannel}
              friendRequestSent={friendRequestSent}
              onOpenProfile={handleOpenProfile}
              onAddFriend={handleAddFriend}
              onCancelRequest={handleCancelRequest}
              onCall={handleCall}
              onVideoCall={handleVideoCall}
              getFullName={getFullName}
            />
            <ChatMessages
              selectedUser={selectedUser}
              selectedChannel={selectedChannel}
              getFullName={getFullName}
            />
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
              pendingRequests={pendingRequests}
              onRequestAction={handleRequestAction}
            />
            <FriendsModal
              open={openFriends}
              onClose={handleCloseFriends}
              friends={friends}
            />
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center bg-gray-50">
            <p className="text-gray-500 text-lg">
              Select a chat or channel to start messaging
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Main;
