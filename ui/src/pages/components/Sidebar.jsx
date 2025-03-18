import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  IconButton,
  TextField,
  Tooltip,
  Badge,
  Button,
  Modal,
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { Settings, People, Person, Add, PersonAdd } from "@mui/icons-material";

import ChannelList from "../../components/ChannelList";
import FriendList from "../../components/FriendList";
import FriendListModal from "../../components/FriendListModal";
import { successToast, errorToast } from "../../utils/toast";
import { stompClient } from "../../utils/ws";
import { fetchCreateChannel } from "../../stores/middlewares/channelMiddleware";
import {
  sendFriendRequest,
  acceptFriendRequest,
} from "../../stores/middlewares/friendshipMiddleware";
import { setCurrentFriend } from "../../stores/slices/friendShipSlice";
import {
  receiveMessage,
  removeCurrentChannel,
} from "../../stores/slices/channelSlice";

const Sidebar = () => {
  // Redux hooks
  const dispatch = useDispatch();
  const { friendSuggestions, friends, pendingRequests } = useSelector(
    (state) => state.friendship
  );
  const { channels } = useSelector((state) => state.channel);
  const userFirstname = useSelector((state) => state.auth.user.firstname);
  const userId = useSelector((state) => state.auth.user.id);

  // State management
  const [search, setSearch] = useState("");
  const [isAddingChannel, setIsAddingChannel] = useState(false);
  const [newChannelName, setNewChannelName] = useState("");
  const [openFriendModal, setOpenFriendModal] = useState(false);
  const [openFriendRequestsModal, setOpenFriendRequestsModal] = useState(false);
  const [openSuggestionsModal, setOpenSuggestionsModal] = useState(false);

  // Friend-related handlers
  const handleAddFriend = async (user) => {
    const res = await dispatch(sendFriendRequest(user.id)).unwrap();
    if (res) successToast("Send friend request successfully");
  };

  const handleAcceptRequest = (request) => {
    dispatch(acceptFriendRequest(request.id));
  };

  // Channel-related handlers
  const handleAddChannelClick = () => setIsAddingChannel(true);

  const handleChannelSubmit = async (e) => {
    if (e.key === "Enter" && newChannelName.trim()) {
      try {
        const res = await dispatch(fetchCreateChannel(newChannelName)).unwrap();
        stompClient.subscribe(`/channels/${res.id}`, (message) => {
          console.log("Message received: ", message.body);
        });
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
        setIsAddingChannel(false);
        successToast("Add channel successfully");
      } catch (error) {
        errorToast("Failed to create channel");
        console.error("Error creating channel: ", error);
      }
    }
  };

  // Modal handlers
  const handleOpenFriendModal = () => setOpenFriendModal(true);
  const handleCloseFriendModal = () => setOpenFriendModal(false);
  const handleOpenFriendRequestsModal = () => setOpenFriendRequestsModal(true);
  const handleCloseFriendRequestsModal = () =>
    setOpenFriendRequestsModal(false);
  const handleFriendSuggestions = () => setOpenSuggestionsModal(true);
  const handleCloseSuggestionsModal = () => setOpenSuggestionsModal(false);

  // User selection handler
  const onSelectUser = () => {
    dispatch(setCurrentFriend());
    dispatch(removeCurrentChannel());
  };

  // WebSocket handling
  const onReceivedMessage = (message) => {
    dispatch(receiveMessage(JSON.parse(message.body)));
    console.log("Message received from channel: ", JSON.parse(message.body));
  };

  useEffect(() => {
    stompClient.activate();
    stompClient.onConnect = () => {
      console.log("Connected to WebSocket");
      channels.forEach((channel) => {
        console.log("Subscribing to channel: ", channel.name);
        stompClient.subscribe(`/channels/${channel.id}`, onReceivedMessage);
      });
    };

    return () => {
      stompClient.deactivate();
      console.log("Disconnected from WebSocket");
    };
  }, [channels]);

  // Modal styles
  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: { xs: "90%", sm: 400 },
    maxHeight: "80vh",
    bgcolor: "background.paper",
    borderRadius: 2,
    boxShadow: 24,
    p: 3,
    overflowY: "auto",
  };

  return (
    <motion.div
      initial={{ x: -300 }}
      animate={{ x: 0 }}
      transition={{ type: "spring", stiffness: 100 }}
      className="w-80 bg-white border-r flex flex-col"
    >
      {/* Header */}
      <div className="p-3 bg-white border-b flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-800">Messenger</h2>
        <div className="flex gap-2">
          <Tooltip title="Friend Requests" arrow>
            <IconButton
              sx={{ color: "#65676b" }}
              onClick={handleOpenFriendRequestsModal}
            >
              <Badge badgeContent={pendingRequests.length || 2} color="primary">
                <People />
              </Badge>
            </IconButton>
          </Tooltip>
          <Tooltip title="Friends" arrow>
            <IconButton
              sx={{ color: "#65676b" }}
              onClick={handleOpenFriendModal}
            >
              <Badge badgeContent={friends.length} color="primary">
                <Person />
              </Badge>
            </IconButton>
          </Tooltip>
          <Tooltip title="Friend Suggestions" arrow>
            <IconButton
              sx={{ color: "#65676b" }}
              onClick={handleFriendSuggestions}
            >
              <Badge badgeContent={friendSuggestions.length} color="primary">
                <PersonAdd />
              </Badge>
            </IconButton>
          </Tooltip>
          <Tooltip title="Settings" arrow>
            <Link to="/settings">
              <IconButton sx={{ color: "#65676b" }}>
                <Settings />
              </IconButton>
            </Link>
          </Tooltip>
        </div>
      </div>

      {/* Search */}
      <div className="p-3">
        <TextField
          variant="outlined"
          fullWidth
          placeholder="Search Messenger"
          size="small"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: "9999px",
              backgroundColor: "#f0f2f5",
              "& fieldset": { border: "none" },
            },
          }}
        />
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-3">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-sm font-semibold text-gray-600">Channels</h3>
            <Tooltip
              title={isAddingChannel ? "Enter channel name" : "Add Channel"}
              arrow
            >
              {isAddingChannel ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  <TextField
                    autoFocus
                    size="small"
                    placeholder="Channel name"
                    value={newChannelName}
                    onChange={(e) => setNewChannelName(e.target.value)}
                    onKeyPress={handleChannelSubmit}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "20px",
                        backgroundColor: "#f0f2f5",
                        "& fieldset": { border: "none" },
                        width: "150px",
                      },
                    }}
                  />
                </motion.div>
              ) : (
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    variant="contained"
                    size="small"
                    startIcon={<Add />}
                    onClick={handleAddChannelClick}
                    sx={{
                      borderRadius: "20px",
                      textTransform: "none",
                      background:
                        "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
                      boxShadow: "0 3px 5px 2px rgba(33, 203, 243, .3)",
                      color: "white",
                      padding: "4px 12px",
                    }}
                  >
                    Add
                  </Button>
                </motion.div>
              )}
            </Tooltip>
          </div>
          <ChannelList />
          <FriendList friends={friends} />
        </div>
      </div>

      {/* Friend List Modal */}
      <Modal
        open={openFriendModal}
        onClose={handleCloseFriendModal}
        aria-labelledby="friend-list-modal"
      >
        <Box sx={modalStyle}>
          <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
            Your Friends
          </Typography>
          <FriendListModal friends={friends} onSelectUser={onSelectUser} />
          <Button
            onClick={handleCloseFriendModal}
            variant="contained"
            sx={{ mt: 2, width: "100%" }}
          >
            Close
          </Button>
        </Box>
      </Modal>

      {/* Friend Requests Modal */}
      <Modal
        open={openFriendRequestsModal}
        onClose={handleCloseFriendRequestsModal}
        aria-labelledby="friend-requests-modal"
      >
        <Box sx={modalStyle}>
          <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
            Friend Requests
          </Typography>
          <List dense>
            {pendingRequests.length > 0 ? (
              pendingRequests.map((request) => (
                <ListItem
                  key={request.id}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    py: 1,
                  }}
                >
                  <ListItemText
                    primary={
                      <Typography
                        sx={{
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          maxWidth: "200px",
                        }}
                      >
                        {`${request.firstname} ${request.lastname}`}
                      </Typography>
                    }
                    secondary={
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          maxWidth: "200px",
                        }}
                      >
                        {request.email}
                      </Typography>
                    }
                  />
                  <Button
                    variant="outlined"
                    size="small"
                    sx={{ ml: 2, minWidth: "80px" }}
                    onClick={() => handleAcceptRequest(request)}
                  >
                    Accept
                  </Button>
                </ListItem>
              ))
            ) : (
              <Typography>No pending friend requests</Typography>
            )}
          </List>
          <Button
            onClick={handleCloseFriendRequestsModal}
            variant="contained"
            sx={{ mt: 2, width: "100%" }}
          >
            Close
          </Button>
        </Box>
      </Modal>

      {/* Friend Suggestions Modal */}
      <Modal
        open={openSuggestionsModal}
        onClose={handleCloseSuggestionsModal}
        aria-labelledby="friend-suggestions-modal"
      >
        <Box sx={modalStyle}>
          <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
            Friend Suggestions
          </Typography>
          <List dense>
            {friendSuggestions.length > 0 ? (
              friendSuggestions.map((user) => (
                <ListItem
                  key={user.id}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    py: 1,
                  }}
                >
                  <ListItemText
                    primary={
                      <Typography
                        sx={{
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          maxWidth: "200px",
                        }}
                      >
                        {`${user.firstname} ${user.lastname}`}
                      </Typography>
                    }
                    secondary={
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          maxWidth: "200px",
                        }}
                      >
                        {user.email}
                      </Typography>
                    }
                  />
                  <Button
                    variant="outlined"
                    size="small"
                    sx={{ ml: 2, minWidth: "80px" }}
                    onClick={() => handleAddFriend(user)}
                  >
                    Add Friend
                  </Button>
                </ListItem>
              ))
            ) : (
              <Typography>No suggestions available</Typography>
            )}
          </List>
          <Button
            onClick={handleCloseSuggestionsModal}
            variant="contained"
            sx={{ mt: 2, width: "100%" }}
          >
            Close
          </Button>
        </Box>
      </Modal>
    </motion.div>
  );
};

export default Sidebar;
