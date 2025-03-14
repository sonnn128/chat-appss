import React from "react";
import { Avatar, IconButton, Tooltip } from "@mui/material";
import {
  PersonAdd,
  Phone,
  Videocam,
  Cancel,
  GroupAdd,
} from "@mui/icons-material";
import { useSelector } from "react-redux";

const ChatHeader = ({
  onOpenProfile,
  onAddFriend,
  onCancelRequest,
  onAddMember,
}) => {
  const currentChannel = useSelector((state) => state.channel.currentChannel);
  const currentFriend = useSelector((state) => state.friendship.currentFriend);

  const getFullName = () => {
    return currentFriend
      ? `${currentFriend.firstname} ${currentFriend.lastname}`
      : "";
  };

  return (
    <div className="p-3 border-b flex items-center justify-between bg-white">
      <div className="flex items-center">
        <Avatar
          sx={{ width: 40, height: 40, cursor: "pointer" }}
          alt={getFullName() || currentChannel?.name}
          onClick={onOpenProfile}
        />
        <div className="ml-3">
          <h3 className="text-lg font-semibold text-gray-900">
            {getFullName() || currentChannel?.name}
          </h3>
          <p className="text-sm text-gray-500">Active now</p>
        </div>
      </div>
      <div className="flex gap-2">
        {currentFriend ? (
          false ? (
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
          )
        ) : (
          <Tooltip title="Add Member" arrow>
            <IconButton sx={{ color: "#65676b" }} onClick={onAddMember}>
              <GroupAdd />
            </IconButton>
          </Tooltip>
        )}
        <Tooltip title="Call" arrow>
          <IconButton sx={{ color: "#65676b" }}>
            <Phone />
          </IconButton>
        </Tooltip>
        <Tooltip title="Video Call" arrow>
          <IconButton sx={{ color: "#65676b" }}>
            <Videocam />
          </IconButton>
        </Tooltip>
      </div>
    </div>
  );
};

export default ChatHeader;
