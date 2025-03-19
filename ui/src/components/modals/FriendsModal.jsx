import React from "react";
import { Modal, Box, Typography, Button } from "@mui/material";
import FriendListModal from "../friends/FriendListModal";

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

const FriendsModal = ({ open, onClose, friends, onSelectUser }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={modalStyle}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Your Friends
        </Typography>
        <FriendListModal friends={friends} onSelectUser={onSelectUser} />
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
