import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Modal,
  Box,
  Typography,
  List,
  ListItem,
  Checkbox,
  Button,
  Stack,
} from "@mui/joy";
import { addMembersToChannel } from "../../stores/middlewares/channelMiddleware";

import modalStyle from "./modalStyles";

const AddMemberModal = ({ open, onClose }) => {
  const dispatch = useDispatch();
  const { friends } = useSelector((state) => state.friendship);
  const channelId = useSelector((state) => state.channel.currentChannelId);
  const [selectedFriends, setSelectedFriends] = useState([]);

  // Handlers
  const toggleFriend = (friendId) =>
    setSelectedFriends((prev) =>
      prev.includes(friendId)
        ? prev.filter((id) => id !== friendId)
        : [...prev, friendId]
    );

  const getName = (friend) =>
    `${friend?.firstname || ""} ${friend?.lastname || ""}`.trim() ||
    "Unknown User";

  const handleAddMembers = () => {
    dispatch(addMembersToChannel({ userIds: selectedFriends, channelId }));
    setSelectedFriends([]); // Reset danh sách
    onClose(); // Đóng modal
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={modalStyle}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          mb={2}
        >
          <Typography
            level="h3"
            sx={{
              fontSize: "1.25rem", // Chữ vừa phải
              fontWeight: "600", // Đậm nhẹ
              color: "#333", // Màu xám đậm nhẹ
            }}
          >
            Add Members
          </Typography>
          <Button
            onClick={onClose}
            sx={{
              minWidth: "auto",
              fontSize: "1rem",
              color: "#666", // Xám trung tính
              "&:hover": { color: "#333" },
            }}
          >
            ✕
          </Button>
        </Stack>

        <Box sx={{ maxHeight: 300, overflowY: "auto" }}>
          {friends?.length ? (
            <List>
              {friends.map((friend) => (
                <ListItem key={friend.id} sx={{ py: 1 }}>
                  <Stack
                    direction="row"
                    alignItems="center"
                    spacing={1.5}
                    width="100%"
                  >
                    <Checkbox
                      checked={selectedFriends.includes(friend.id)}
                      onChange={() => toggleFriend(friend.id)}
                      sx={{ color: "#666" }} // Checkbox xám nhẹ
                    />
                    <Typography sx={{ fontSize: "1rem", color: "#333" }}>
                      {getName(friend)}
                    </Typography>
                  </Stack>
                </ListItem>
              ))}
            </List>
          ) : (
            <Typography
              sx={{
                textAlign: "center",
                py: 2,
                fontSize: "1rem",
                color: "#666", // Xám nhẹ
              }}
            >
              No friends available
            </Typography>
          )}
        </Box>

        {!!selectedFriends.length && (
          <Button
            onClick={handleAddMembers}
            variant="solid"
            color="primary"
            sx={{
              mt: 3,
              width: "100%",
              py: 1,
              fontSize: "1rem",
              bgcolor: "#1976d2", // Xanh nhẹ nhàng
              "&:hover": { bgcolor: "#1565c0" }, // Đậm hơn một chút khi hover
            }}
          >
            Add
          </Button>
        )}
      </Box>
    </Modal>
  );
};

export default AddMemberModal;
