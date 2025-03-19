import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal, Box, Typography, Button, Avatar } from "@mui/material";
import { setCurrentFriend } from "../../stores/slices/friendShipSlice";
import { removeCurrentChannel } from "../../stores/slices/channelSlice";
import modalStyle from "./modalStyles";

const FriendsModal = ({ open, onClose }) => {
  const dispatch = useDispatch();
  const friends = useSelector((state) => state.friendship.friends);

  // Handler để chọn bạn bè
  const handleSelectFriend = (friend) => {
    dispatch(setCurrentFriend(friend));
    dispatch(removeCurrentChannel());
    onClose(); // Đóng modal sau khi chọn
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={modalStyle}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Your Friends
        </Typography>
        <Box className="flex-1 overflow-y-auto px-2">
          {friends?.length > 0 ? (
            friends.map((friend) => (
              <div
                key={friend.id}
                className="flex items-center p-3 rounded-lg cursor-pointer hover:bg-gray-100"
                onClick={() => handleSelectFriend(friend)}
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
                    {friend.email || "email"}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ textAlign: "center", py: 2 }}
            >
              No friends to display
            </Typography>
          )}
        </Box>
        <Button
          onClick={onClose}
          variant="contained"
          sx={{ mt: 2, width: "100%" }}
        >
          Close
        </Button>
      </Box>
    </Modal>
  );
};

export default FriendsModal;
