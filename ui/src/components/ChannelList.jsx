import React, { useEffect } from "react";
import { Avatar, AvatarGroup } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentChannel } from "../stores/slices/channelSlice";
import { removeCurrentFriend } from "../stores/slices/friendShipSlice";
import { fetchAllMessageOfChannel } from "../stores/middlewares/messageMiddleware";

function ChannelList() {
  const dispatch = useDispatch();
  const { channels, currentChannelId } = useSelector((state) => state.channel);

  const onSelectChannel = (channel) => {
    dispatch(setCurrentChannel(channel));
    dispatch(removeCurrentFriend());
  };

  useEffect(() => {
    if (currentChannelId) {
      dispatch(fetchAllMessageOfChannel(currentChannelId));
    }
  }, [currentChannelId]);

  return (
    <div className="flex-1 overflow-y-auto px-2">
      {channels.length > 0 ? (
        channels.map((channel) => (
          <div
            key={channel.id}
            className="flex items-center p-3 rounded-lg cursor-pointer hover:bg-gray-100"
            onClick={() => onSelectChannel(channel)}
          >
            <AvatarGroup
              max={3}
              sx={{
                width: 40,
                height: 40,
                "& .MuiAvatar-root": { width: 20, height: 20, fontSize: 12 },
              }}
            >
              <Avatar alt={channel.name}>
                {channel.name.charAt(0).toUpperCase()}
              </Avatar>
              <Avatar alt="member2">G</Avatar> {/* G for Group */}
              <Avatar alt="member3">+</Avatar>
            </AvatarGroup>
            <div className="ml-3 flex-1 min-w-0">
              <p className="font-semibold text-gray-900 truncate">
                {channel.name}
              </p>
              <p className="text-sm text-gray-600 truncate">
                Created: {new Date(channel.dateCreated).toLocaleDateString()}
              </p>
            </div>
          </div>
        ))
      ) : (
        <p className="text-gray-500">No channels available</p>
      )}
    </div>
  );
}

export default ChannelList;
