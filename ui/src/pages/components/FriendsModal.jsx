// components/FriendsModal.js
import React from "react";
import {
  Modal,
  Box,
  Typography,
  Button,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: "8px",
  boxShadow: 24,
  p: 4,
};

const FriendsModal = ({ open, onClose, friends }) => {
  console.log("friends: " , friends);
  
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="friends-modal-title"
    >
      <Box sx={modalStyle}>
        <Typography
          id="friends-modal-title"
          variant="h6"
          component="h2"
          gutterBottom
        >
          Friends ({friends.length})
        </Typography>
        {friends.length === 0 ? (
          <Typography variant="body1">You have no friends yet.</Typography>
        ) : (
          <List sx={{ maxHeight: 300, overflowY: "auto" }}>
            {friends.map((friend) => (
              <ListItem key={friend.id} divider>
                <ListItemText
                  primary={`${friend.firstname} ${friend.lastname}`}
                />
              </ListItem>
            ))}
          </List>
        )}
        <Button
          onClick={onClose}
          sx={{ mt: 2, width: "100%" }}
          variant="contained"
        >
          Close
        </Button>
      </Box>
    </Modal>
  );
};

export default FriendsModal;