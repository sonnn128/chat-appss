import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { IconButton, TextField, Tooltip, Badge, Button } from "@mui/material";
import { Settings, People, Person, Add, PersonAdd } from "@mui/icons-material";
import ChannelList from "../../components/channels/ChannelList";
import FriendList from "../../components/friends/FriendList";
import FriendsModal from "../../components/modals/FriendsModal";
import FriendRequestsModal from "../../components/modals/FriendRequestsModal";
import FriendSuggestionsModal from "../../components/modals/FriendSuggestionsModal";
import { successToast, errorToast } from "../../utils/toast";
import { stompClient } from "../../utils/ws";
import { fetchCreateChannel } from "../../stores/middlewares/channelMiddleware";
import {
  sendFriendRequest,
  acceptFriendRequest,
} from "../../stores/middlewares/friendshipMiddleware";
import { setCurrentFriend } from "../../stores/slices/friendshipSlice";
import {
  receiveMessage,
  removeCurrentChannel,
  setCurrentChannel,
} from "../../stores/slices/channelSlice";

const Sidebar = () => {
  const dispatch = useDispatch();
  const { friendSuggestions, friends, pendingRequests } = useSelector(
    (state) => state.friendship
  );
  const { channels } = useSelector((state) => state.channel);
  const { firstname: userFirstname, id: userId } = useSelector(
    (state) => state.auth.user
  );

  const [isAddingChannel, setIsAddingChannel] = useState(false);
  const [newChannelName, setNewChannelName] = useState("");
  const [openModal, setOpenModal] = useState({
    friends: false,
    requests: false,
    suggestions: false,
  });

  const handleAddFriend = async (userId) => {
    const res = await dispatch(sendFriendRequest(userId)).unwrap();
    if (res) successToast("Friend request sent");
  };

  const handleAcceptRequest = (requestId) =>
    dispatch(acceptFriendRequest(requestId));

  const handleChannelSubmit = async (e) => {
    if (e.key === "Enter" && newChannelName.trim()) {
      try {
        const res = await dispatch(fetchCreateChannel(newChannelName)).unwrap();
        stompClient.subscribe(`/channels/${res.id}`, (msg) =>
          console.log("Message:", msg.body)
        );
        stompClient.publish({
          destination: `/app/channels/${res.id}`,
          body: JSON.stringify({
            key: { channelId: res.id },
            userId,
            content: `${userFirstname} created channel!`,
            type: "NOTICE",
            timestamp: Date.now(),
          }),
        });
        setNewChannelName("");
        dispatch(setCurrentChannel(res));
        setIsAddingChannel(false);
        successToast("Channel added");
      } catch (error) {
        errorToast("Channel creation failed");
        console.error(error);
      }
    }
  };

  const toggleModal = (type) =>
    setOpenModal((prev) => ({ ...prev, [type]: !prev[type] }));

  const onSelectUser = () => {
    dispatch(setCurrentFriend());
    dispatch(removeCurrentChannel());
  };

  useEffect(() => {
    stompClient.activate();
    stompClient.onConnect = () => {
      console.log("WebSocket connected");
      channels.forEach((channel) =>
        stompClient.subscribe(`/channels/${channel.id}`, (msg) =>
          dispatch(receiveMessage(JSON.parse(msg.body)))
        )
      );
    };
    return () => stompClient.deactivate();
  }, [channels, dispatch]);

  const textFieldSx = {
    "& .MuiOutlinedInput-root": {
      borderRadius: "9999px",
      backgroundColor: "#f0f2f5",
      "& fieldset": { border: "none" },
    },
  };

  return (
    <motion.div
      initial={{ x: -300 }}
      animate={{ x: 0 }}
      transition={{ type: "spring", stiffness: 100 }}
      className="w-80 bg-white border-r flex flex-col"
    >
      <div className="p-3 bg-white border-b flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-800">Messenger</h2>
        <div className="flex gap-2">
          {[
            {
              title: "Friend Requests",
              icon: <People />,
              count: pendingRequests.length,
              onClick: () => toggleModal("requests"),
            },
            {
              title: "Friends",
              icon: <Person />,
              count: friends.length,
              onClick: () => toggleModal("friends"),
            },
            {
              title: "Friend Suggestions",
              icon: <PersonAdd />,
              count: friendSuggestions.length,
              onClick: () => toggleModal("suggestions"),
            },
            { title: "Settings", icon: <Settings />, to: "/settings" },
          ].map(({ title, icon, count, onClick, to }) => (
            <Tooltip key={title} title={title} arrow>
              {to ? (
                <Link to={to}>
                  <IconButton sx={{ color: "#65676b" }}>{icon}</IconButton>
                </Link>
              ) : (
                <IconButton sx={{ color: "#65676b" }} onClick={onClick}>
                  <Badge badgeContent={count || 0} color="primary">
                    {icon}
                  </Badge>
                </IconButton>
              )}
            </Tooltip>
          ))}
        </div>
      </div>

      <div className="p-3">
        <TextField
          variant="outlined"
          fullWidth
          placeholder="Search Messenger"
          size="small"
          sx={textFieldSx}
        />
      </div>

      <div className="flex-1 overflow-y-auto p-3">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-sm font-semibold text-gray-600">Channels</h3>
          {isAddingChannel ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <TextField
                autoFocus
                size="small"
                placeholder="Channel name"
                value={newChannelName}
                onChange={(e) => setNewChannelName(e.target.value)}
                onKeyPress={handleChannelSubmit}
                sx={{
                  ...textFieldSx,
                  "& .MuiOutlinedInput-root": { width: "150px" },
                }}
              />
            </motion.div>
          ) : (
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="contained"
                size="small"
                startIcon={<Add />}
                onClick={() => setIsAddingChannel(true)}
                sx={{
                  borderRadius: "20px",
                  textTransform: "none",
                  bgcolor: "#2196F3",
                  color: "white",
                }}
              >
                Add
              </Button>
            </motion.div>
          )}
        </div>
        <ChannelList />
        <FriendList friends={friends} />
      </div>

      {/* Sử dụng các modal component riêng */}
      <FriendsModal
        open={openModal.friends}
        onClose={() => toggleModal("friends")}
        friends={friends}
        onSelectUser={onSelectUser}
      />
      <FriendRequestsModal
        open={openModal.requests}
        onClose={() => toggleModal("requests")}
        requests={pendingRequests}
        onAccept={handleAcceptRequest}
      />
      <FriendSuggestionsModal
        open={openModal.suggestions}
        onClose={() => toggleModal("suggestions")}
        suggestions={friendSuggestions}
        onAddFriend={handleAddFriend}
      />
    </motion.div>
  );
};

export default Sidebar;
