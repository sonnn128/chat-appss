import React from "react";
import { Avatar, IconButton, Tooltip } from "@mui/material";
import { PersonAdd, Phone, Videocam, Cancel } from "@mui/icons-material";

const ChatHeader = ({
  selectedUser,
  friendRequestSent,
  onOpenProfile,
  onAddFriend,
  onCancelRequest,
  onCall,
  onVideoCall,
  getFullName,
}) => {
  return (
    <div className="p-3 border-b flex items-center justify-between bg-white">
      <div className="flex items-center">
        <Avatar
          sx={{ width: 40, height: 40, cursor: "pointer" }}
          src={selectedUser.avatar || ""}
          alt={getFullName(selectedUser)}
          onClick={onOpenProfile}
        />
        <div className="ml-3">
          <h3 className="text-lg font-semibold text-gray-900">
            {getFullName(selectedUser)}
          </h3>
          <p className="text-sm text-gray-500">Active now</p>
        </div>
      </div>
      <div className="flex gap-2">
        {friendRequestSent ? (
          <Tooltip title="Cancel Request" arrow>
            <IconButton sx={{ color: "#65676b" }} onClick={onCancelRequest}>
              <Cancel />
            </IconButton>
          </Tooltip>
        ) : (
          <Tooltip title="Add Friend" arrow>
            <IconButton sx={{ color: "#65676b" }} onClick={onAddFriend}>
              <PersonAdd />
            </IconButton>
          </Tooltip>
        )}
        <Tooltip title="Call" arrow>
          <IconButton sx={{ color: "#65676b" }} onClick={onCall}>
            <Phone />
          </IconButton>
        </Tooltip>
        <Tooltip title="Video Call" arrow>
          <IconButton sx={{ color: "#65676b" }} onClick={onVideoCall}>
            <Videocam />
          </IconButton>
        </Tooltip>
      </div>
    </div>
  );
};

export default ChatHeader;
