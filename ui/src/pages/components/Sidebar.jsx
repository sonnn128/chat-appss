import React from "react";
import { IconButton, TextField, Tooltip, Badge } from "@mui/material";
import { Settings, GroupAdd, People, Person } from "@mui/icons-material"; // Thêm Person icon
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import FriendList from "../../components/FriendList";
import SearchList from "../../components/SearchList";

const Sidebar = ({
  search,
  setSearch,
  friends,
  channels,
  pendingRequests,
  searchResults,
  onSelectUser,
  onSelectChannel,
  onNewChannel,
  onOpenFriendRequests,
  onOpenFriends, // Thêm prop để mở modal danh sách bạn bè
}) => {
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
          <Tooltip title="New Channel" arrow>
            <IconButton sx={{ color: "#65676b" }} onClick={onNewChannel}>
              <GroupAdd />
            </IconButton>
          </Tooltip>
          <Tooltip title="Friend Requests" arrow>
            <IconButton
              sx={{ color: "#65676b" }}
              onClick={onOpenFriendRequests}
            >
              <Badge badgeContent={pendingRequests.length} color="primary">
                <People />
              </Badge>
            </IconButton>
          </Tooltip>
          <Tooltip title="Friends" arrow>
            <IconButton sx={{ color: "#65676b" }} onClick={onOpenFriends}>
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

      {searchResults.length > 0 ? (
        <SearchList searchResults={searchResults} onSelectUser={onSelectUser} />
      ) : (
        <div className="flex-1 overflow-y-auto">
          <div className="p-3">
            <h3 className="text-sm font-semibold text-gray-600">Channels</h3>
            {channels.map((channel) => (
              <div
                key={channel.id}
                className="p-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => onSelectChannel(channel)}
              >
                {JSON.stringify(channel)}
                {/* {channel.name} */}
              </div>
            ))}
          </div>
          <FriendList friends={friends} onSelectUser={onSelectUser} />
        </div>
      )}
    </motion.div>
  );
};

export default Sidebar;
