import React, { useState } from "react";
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
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import ChannelList from "../../components/ChannelList";
import { useDispatch, useSelector } from "react-redux";
import { successToast } from "../../utils/toast";
import { fetchCreateChannel } from "../../stores/middlewares/channelMiddleware";
import { stompClient } from "../../utils/ws";
import { setCurrentFriend } from "../../stores/slices/friendShipSlice";
import { removeCurrentChannel } from "../../stores/slices/channelSlice";
import {
  acceptFriendRequest,
  sendFriendRequest,
} from "../../stores/middlewares/friendshipMiddleware";
import FriendListModal from "../../components/FriendListModal";
import FriendList from "../../components/FriendList";

const Sidebar = () => {
  const dispatch = useDispatch();

  const handleAddFriend = async(user) => {
    const res  = await dispatch(sendFriendRequest(user.id)).unwrap();
    console.log("res: ", res);
    
    if(res){
      successToast("Send friend request successfully")
    }
  };

  const { friendSuggestions, friends, pendingRequests } = useSelector(
    (state) => state.friendship
  );
  const handleAcceptRequest = (request) => {
    dispatch(acceptFriendRequest(request.friend.id));
  };

  const [search, setSearch] = useState("");

  const userFirstname = useSelector((state) => state.auth.user.firstname);
  const userId = useSelector((state) => state.auth.user.id);

  const [isAddingChannel, setIsAddingChannel] = useState(false);
  const [newChannelName, setNewChannelName] = useState("");

  const [openFriendModal, setOpenFriendModal] = useState(false);
  const [openFriendRequestsModal, setOpenFriendRequestsModal] = useState(false);
  const [openSuggestionsModal, setOpenSuggestionsModal] = useState(false);

  const handleAddChannelClick = () => {
    setIsAddingChannel(true);
  };

  const handleChannelSubmit = async (e) => {
    if (e.key === "Enter" && newChannelName.trim()) {
      const res = await dispatch(fetchCreateChannel(newChannelName)).unwrap();
      const url = `/channels/${res.id}`;
      console.log("Url: ", url);

      stompClient.subscribe(`${url}`, (message) => {
        console.log("Message received: ", message.body);
      });

      stompClient.publish({
        destination: `/app/channels/${res.id}`,
        body: JSON.stringify({
          key: { channelId: res.id },
          userId: userId,
          content: `${userFirstname} created channel!`,
          type: "NOTICE",
          timestamp: Date.now(),
        }),
      });

      setNewChannelName("");
      successToast("Add channel successfully");
    }
  };

  const onSelectUser = () => {
    dispatch(setCurrentFriend());
    dispatch(removeCurrentChannel());
  };

  const handleFriendSuggestions = async () => {
    setOpenSuggestionsModal(true);
  };

  const handleOpenFriendModal = () => {
    setOpenFriendModal(true);
  };

  const handleCloseFriendModal = () => {
    setOpenFriendModal(false);
  };

  const handleOpenFriendRequestsModal = () => {
    setOpenFriendRequestsModal(true);
  };

  const handleCloseFriendRequestsModal = () => {
    setOpenFriendRequestsModal(false);
  };

  const handleCloseSuggestionsModal = () => {
    setOpenSuggestionsModal(false);
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
          <FriendList friends={friends}/>
        </div>
      </div>

      {/* Modal for Friend List */}
      <Modal
        open={openFriendModal}
        onClose={handleCloseFriendModal}
        aria-labelledby="friend-list-modal"
        aria-describedby="modal-to-show-friend-list"
      >
        <Box
          sx={{
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
          }}
        >
          <Typography
            id="friend-list-modal"
            variant="h6"
            component="h2"
            sx={{ mb: 2 }}
          >
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

      {/* Modal for Friend Requests */}
      <Modal
        open={openFriendRequestsModal}
        onClose={handleCloseFriendRequestsModal}
        aria-labelledby="friend-requests-modal"
        aria-describedby="modal-to-show-friend-requests"
      >
        <Box
          sx={{
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
          }}
        >
          <Typography
            id="friend-requests-modal"
            variant="h6"
            component="h2"
            sx={{ mb: 2 }}
          >
            Friend Requests
          </Typography>
          <List dense>
            {pendingRequests.length > 0 ? (
              pendingRequests.map((request) => (
                <ListItem
                  key={request.friend.id}
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
                        {`${request.friend.firstname} ${request.friend.lastname}`}
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
                        {request.friend.email}
                      </Typography>
                    }
                  />
                  {/* You might want to add Accept/Reject buttons here */}
                  <Button
                    variant="outlined"
                    size="small"
                    sx={{ ml: 2, minWidth: "80px" }}
                    onClick={() => handleAcceptRequest(request)}
                    // Add your accept friend request handler here
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

      {/* Modal for Friend Suggestions */}
      <Modal
        open={openSuggestionsModal}
        onClose={handleCloseSuggestionsModal}
        aria-labelledby="friend-suggestions-modal"
        aria-describedby="modal-to-show-friend-suggestions"
      >
        <Box
          sx={{
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
          }}
        >
          <Typography
            id="friend-suggestions-modal"
            variant="h6"
            component="h2"
            sx={{ mb: 2 }}
          >
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
