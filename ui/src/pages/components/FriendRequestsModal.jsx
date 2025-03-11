import React from "react";
import { Modal, Box, Typography, Button } from "@mui/material";

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

const FriendRequestsModal = ({ open, onClose }) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="friend-requests-modal-title"
    >
      <Box sx={modalStyle}>
        <Typography
          id="friend-requests-modal-title"
          variant="h6"
          component="h2"
        >
          Friend Requests
        </Typography>
        <Box sx={{ mt: 2 }}>
          <Typography variant="body1">
            Danh sách yêu cầu kết bạn sẽ hiển thị ở đây.
          </Typography>
        </Box>
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

export default FriendRequestsModal;
