import React from "react";
import { Avatar } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentFriend } from "../stores/slices/friendShipSlice";
import { removeCurrentChannel } from "../stores/slices/channelSlice";

function FriendListModal() {
  const dispatch = useDispatch();
  const friends = useSelector((state) => state.friendship.friends);

  const onSelectUser = (friend) => {
    dispatch(setCurrentFriend(friend));
    dispatch(removeCurrentChannel());
  };
  return (
    <div className="flex-1 overflow-y-auto px-2">
      {friends.length > 0 &&
        friends.map((friend) => (
          <div
            key={friend.id}
            className="flex items-center p-3 rounded-lg cursor-pointer hover:bg-gray-100"
            onClick={() => onSelectUser(friend)}
          >
            <Avatar
              sx={{ width: 40, height: 40 }}
              src={friend.avatar || ""}
              alt={friend.username}
            />
            <div className="ml-3 flex-1 min-w-0">
              <p className="font-semibold text-gray-900 truncate">
                {friend.firstname + " " + friend.lastname}
              </p>
              <p className="text-sm text-gray-600 truncate">
                {friend.lastMessage || "No messages yet"}
              </p>
            </div>
          </div>
        ))}
    </div>
  );
}

export default FriendListModal;
