import React from "react";
import {
  Modal,
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Button,
} from "@mui/material";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: "90%", sm: 400 },
  maxHeight: "80vh",
  bgcolor: "background.paper",
  borderRadius: 2,
  boxShadow: 24,
  p: 3,
  overflowY: "auto",
};

const FriendSuggestionsModal = ({
  open,
  onClose,
  suggestions,
  onAddFriend,
}) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={modalStyle}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Friend Suggestions
        </Typography>
        <List dense>
          {suggestions.length ? (
            suggestions.map((user) => (
              <ListItem key={user.id} sx={{ justifyContent: "space-between" }}>
                <ListItemText
                  primary={`${user.firstname} ${user.lastname}`}
                  secondary={user.email}
                />
                <Button
                  variant="outlined"
                  size="small"
                  onClick={() => onAddFriend(user.id)}
                >
                  Add Friend
                </Button>
              </ListItem>
            ))
          ) : (
            <Typography>No suggestions</Typography>
          )}
        </List>
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

export default FriendSuggestionsModal;
