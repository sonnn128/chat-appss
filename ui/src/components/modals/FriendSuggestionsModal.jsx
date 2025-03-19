import React from "react";
import { Modal, Box, Typography, Button, Avatar } from "@mui/material";
import modalStyle from "./modalStyles";

const FriendSuggestionsModal = ({ open, onClose, suggestions, onAddFriend }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={modalStyle}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Friend Suggestions
        </Typography>
        <Box className="flex-1 overflow-y-auto px-2">
          {suggestions?.length > 0 ? (
            suggestions.map((user) => (
              <div
                key={user.id}
                className="flex items-center p-3 rounded-lg cursor-pointer hover:bg-gray-100"
              >
                <Avatar
                  sx={{ width: 40, height: 40 }}
                  src={user.avatar || ""}
                  alt={user.username}
                />
                <div className="ml-3 flex-1 min-w-0">
                  <p className="font-semibold text-gray-900 truncate">
                    {user.firstname + " " + user.lastname}
                  </p>
                  <p className="text-sm text-gray-600 truncate">
                    {user.email || "No email"}
                  </p>
                </div>
                <Button
                  variant="outlined"
                  size="small"
                  onClick={() => onAddFriend(user.id)}
                  sx={{ ml: 2 }}
                >
                  Add Friend
                </Button>
              </div>
            ))
          ) : (
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ textAlign: "center", py: 2 }}
            >
              No suggestions
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

export default FriendSuggestionsModal;