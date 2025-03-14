import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  Box,
  Typography,
  List,
  ListItem,
  Checkbox,
  Button,
  Stack,
} from "@mui/joy";

function FriendListAddMember() {
  const friends = useSelector((state) => state.friendship.friends);
  const [selectedFriends, setSelectedFriends] = useState([]);

  const toggleFriendSelection = (friendId) => {
    setSelectedFriends((prevSelected) =>
      prevSelected.includes(friendId)
        ? prevSelected.filter((id) => id !== friendId)
        : [...prevSelected, friendId]
    );
  };

  const getFullName = (friend) => {
    return friend?.firstname && friend?.lastname
      ? `${friend.firstname} ${friend.lastname}`
      : "Unknown User";
  };

  const handleSend = () => {
    console.log("Selected friends:", selectedFriends);
  };

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
        Select Friends to Add
      </Typography>

      {friends?.length > 0 ? (
        <List sx={{ maxHeight: 300, overflow: "auto" }}>
          {friends.map((friend) => (
            <ListItem
              key={friend.id}
              sx={{
                "&:hover": { bgcolor: "neutral.softHover" },
                py: 1,
              }}
            >
              <Stack
                direction="row"
                alignItems="center"
                spacing={1}
                width="100%"
              >
                <Checkbox
                  checked={selectedFriends.includes(friend.id)}
                  onChange={() => toggleFriendSelection(friend.id)}
                  size="md"
                />
                <Typography level="body1">{getFullName(friend)}</Typography>
              </Stack>
            </ListItem>
          ))}
        </List>
      ) : (
        <Typography
          level="body2"
          color="neutral"
          sx={{ textAlign: "center", py: 2 }}
        >
          No friends available to add
        </Typography>
      )}

      {selectedFriends.length > 0 && (
        <Stack spacing={2} sx={{ mt: 2 }}>
          {selectedFriends.length > 0 && (
            <Button
              onClick={handleSend}
              variant="solid"
              color="primary"
              sx={{ mx: "auto", display: "block" }}
            >
              Add
            </Button>
          )}
        </Stack>
      )}
    </Box>
  );
}

export default FriendListAddMember;
