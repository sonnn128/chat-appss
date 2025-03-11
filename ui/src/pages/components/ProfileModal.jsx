import React from "react";
import { Modal, Box, Typography, Button, Avatar } from "@mui/material";

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

const ProfileModal = ({ open, onClose, user, getFullName }) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="profile-modal-title"
      aria-describedby="profile-modal-description"
    >
      <Box sx={modalStyle}>
        <Typography id="profile-modal-title" variant="h6" component="h2">
          {getFullName(user)}'s Profile
        </Typography>
        <Box sx={{ mt: 2, textAlign: "center" }}>
          <Avatar
            sx={{ width: 100, height: 100, mx: "auto" }}
            src={user.avatar || ""}
            alt={getFullName(user)}
          />
          <Typography variant="h5" sx={{ mt: 2 }}>
            {getFullName(user)}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Email: {user.email || "N/A"}
          </Typography>
        </Box>
        <Button onClick={onClose} sx={{ mt: 2, width: "100%" }} variant="contained">
          Close
        </Button>
      </Box>
    </Modal>
  );
};

export default ProfileModal;