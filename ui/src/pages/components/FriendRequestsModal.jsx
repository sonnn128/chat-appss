import React from "react";
import {
  Modal,
  Box,
  Typography,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
} from "@mui/material";
import friendshipService from "../../services/friendshipService";
import channelService from "../../services/channelService"; // Thêm channelService

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

const FriendRequestsModal = ({ open, onClose, pendingRequests, onRequestAction, onChannelCreated }) => {
  console.log("pendingRequests: ", pendingRequests );
  
  const handleAccept = async (requestId, senderId) => {
    try {
      await friendshipService.acceptFriendRequest(requestId);
      const newChannel = await channelService.createPrivateChannel(senderId);
      if (onRequestAction) onRequestAction();
      if (onChannelCreated) onChannelCreated(newChannel); // Truyền kênh mới lên Main
    } catch (error) {
      console.error("Lỗi khi chấp nhận yêu cầu hoặc tạo kênh:", error);
    }
  };

  // Xử lý từ chối yêu cầu kết bạn
  const handleReject = async (requestId) => {
    try {
      await friendshipService.rejectFriendRequest(requestId);
      if (onRequestAction) onRequestAction();
    } catch (error) {
      console.error("Lỗi khi từ chối yêu cầu:", error);
    }
  };

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
          gutterBottom
        >
          Friend Requests ({pendingRequests.length})
        </Typography>
        {pendingRequests.length === 0 ? (
          <Typography variant="body1">No pending friend requests.</Typography>
        ) : (
          <List sx={{ maxHeight: 300, overflowY: "auto" }}>
            {pendingRequests.map((request) => (
              // here
              <ListItem key={request.id} divider>
                <ListItemText
                  primary={
                    request.sender
                      ? `${request.sender.firstname} ${request.sender.lastname}`
                      : "Unknown User"
                  }
                />
                <ListItemSecondaryAction>
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    onClick={() => handleAccept(request.id, request.sender?.id || request.senderId)}
                    sx={{ mr: 1 }}
                  >
                    Accept
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    size="small"
                    onClick={() => handleReject(request.id)}
                  >
                    Reject
                  </Button>
                </ListItemSecondaryAction>
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

export default FriendRequestsModal;