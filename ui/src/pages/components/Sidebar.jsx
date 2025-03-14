import React, { useState } from "react";
import { IconButton, TextField, Tooltip, Badge, Button } from "@mui/material";
import { Settings, People, Person, Add } from "@mui/icons-material";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import FriendList from "../../components/FriendList";
import ChannelList from "../../components/ChannelList";
import { useDispatch, useSelector } from "react-redux";
import { successToast } from "../../utils/toast";
import { fetchCreateChannel } from "../../stores/middlewares/channelMiddleware";
import { stompClient } from "../../utils/ws";
import { setCurrentFriend } from "../../stores/slices/friendShipSlice";
import { removeCurrentChannel } from "../../stores/slices/channelSlice";

const Sidebar = () => {
  const dispatch = useDispatch();

  const [search, setSearch] = useState("");
  const friends = useSelector((state) => state.friendship.friends);

  const userFirstname = useSelector((state) => state.auth.user.firstname);
  const userId = useSelector((state) => state.auth.user.id);

  const [isAddingChannel, setIsAddingChannel] = useState(false);
  const [newChannelName, setNewChannelName] = useState("");

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
            <IconButton sx={{ color: "#65676b" }}>
              <Badge badgeContent={2} color="primary">
                <People />
              </Badge>
            </IconButton>
          </Tooltip>
          <Tooltip title="Friends" arrow>
            <IconButton sx={{ color: "#65676b" }}>
              <Badge badgeContent={friends.length} color="primary">
                <Person />
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
        </div>
        <FriendList friends={friends} onSelectUser={onSelectUser} />
      </div>
    </motion.div>
  );
};

export default Sidebar;
