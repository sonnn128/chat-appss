import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Typography,
  List,
  ListItem,
  Checkbox,
  Button,
  Stack,
} from "@mui/joy";
import { addMembersToChannel } from "../../stores/middlewares/channelMiddleware";

function FriendListAddMember() {
  const dispatch = useDispatch();
  const { friends } = useSelector((state) => state.friendship);
  const channelId = useSelector((state) => state.channel.currentChannelId);
  const [selectedFriends, setSelectedFriends] = useState([]);

  const toggleFriend = (friendId) =>
    setSelectedFriends((prev) =>
      prev.includes(friendId)
        ? prev.filter((id) => id !== friendId)
        : [...prev, friendId]
    );

  const getName = (friend) =>
    `${friend?.firstname || ""} ${friend?.lastname || ""}`.trim() ||
    "Unknown User";

  const handleSend = () =>
    dispatch(addMembersToChannel({ userIds: selectedFriends, channelId }));

  return (
    <Box
      sx={{
        maxWidth: 400,
        mx: "auto",
        p: 2,
        bgcolor: "background.paper",
        borderRadius: "md",
        boxShadow: "sm",
      }}
    >
      <Typography level="h3" sx={{ mb: 2, textAlign: "center" }}>
        Select Friends
      </Typography>

      {friends?.length ? (
        <List sx={{ maxHeight: 300, overflow: "auto" }}>
          {friends.map((friend) => (
            <ListItem
              key={friend.id}
              sx={{ "&:hover": { bgcolor: "neutral.softHover" }, py: 1 }}
            >
              <Stack
                direction="row"
                alignItems="center"
                spacing={1}
                width="100%"
              >
                <Checkbox
                  checked={selectedFriends.includes(friend.id)}
                  onChange={() => toggleFriend(friend.id)}
                />
                <Typography>{getName(friend)}</Typography>
              </Stack>
            </ListItem>
          ))}
        </List>
      ) : (
        <Typography color="neutral" sx={{ textAlign: "center", py: 2 }}>
          No friends available
        </Typography>
      )}

      {!!selectedFriends.length && (
        <Button
          onClick={handleSend}
          variant="solid"
          color="primary"
          sx={{ mt: 2, mx: "auto", display: "block" }}
        >
          Add
        </Button>
      )}
    </Box>
  );
}

export default FriendListAddMember;
