import React, { useState } from "react";
import {
  Avatar,
  IconButton,
  Tooltip,
  Modal,
  Box,
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Chip,
} from "@mui/material";
import {
  PersonAdd,
  Phone,
  Videocam,
  Cancel,
  GroupAdd,
  Group,
} from "@mui/icons-material";
import { useSelector } from "react-redux";

const ChatHeader = ({
  onOpenProfile,
  onAddFriend,
  onCancelRequest,
  onAddMember,
}) => {
  const currentChannel = useSelector((state) => state.channel.currentChannel);
  const currentFriend = useSelector((state) => state.friendship.currentFriend);
  const joinedChannels = useSelector((state) => state.channel.joinedChannels);

  const [openMemberModal, setOpenMemberModal] = useState(false);

  const getFullName = () => {
    return currentFriend
      ? `${currentFriend.firstname} ${currentFriend.lastname}`
      : "";
  };

  const handleViewMember = () => {
    setOpenMemberModal(true);
  };

  const handleCloseModal = () => {
    setOpenMemberModal(false);
  };

  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    borderRadius: 2,
    maxHeight: "80vh",
    overflowY: "auto",
  };

  return (
    <>
      <div className="p-3 border-b flex items-center justify-between bg-white">
        <div className="flex items-center">
          <Avatar
            sx={{ width: 40, height: 40, cursor: "pointer" }}
            alt={getFullName() || currentChannel?.name}
            onClick={onOpenProfile}
          />
          <div className="ml-3">
            <h3 className="text-lg font-semibold text-gray-900">
              {getFullName() || currentChannel?.name}
            </h3>
            <p className="text-sm text-gray-500">Active now</p>
          </div>
        </div>
        <div className="flex gap-2">
          {currentFriend ? (
            false ? (
              <Tooltip title="Cancel Request" arrow>
                <IconButton sx={{ color: "#65676b" }} onClick={onCancelRequest}>
                  <Cancel />
                </IconButton>
              </Tooltip>
            ) : (
              <Tooltip title="Add Friend" arrow>
                <IconButton sx={{ color: "#65676b" }} onClick={onAddFriend}>
                  <PersonAdd />
                </IconButton>
              </Tooltip>
            )
          ) : (
            <>
              <Tooltip title="Add Member" arrow>
                <IconButton sx={{ color: "#65676b" }} onClick={onAddMember}>
                  <GroupAdd />
                </IconButton>
              </Tooltip>
              <Tooltip title="View Members" arrow>
                <IconButton
                  sx={{ color: "#65676b" }}
                  onClick={handleViewMember}
                >
                  <Group />
                </IconButton>
              </Tooltip>
            </>
          )}
          <Tooltip title="Call" arrow>
            <IconButton sx={{ color: "#65676b" }}>
              <Phone />
            </IconButton>
          </Tooltip>
          <Tooltip title="Video Call" arrow>
            <IconButton sx={{ color: "#65676b" }}>
              <Videocam />
            </IconButton>
          </Tooltip>
        </div>
      </div>

      {/* Modal hiển thị danh sách thành viên */}
      <Modal
        open={openMemberModal}
        onClose={handleCloseModal}
        aria-labelledby="member-modal-title"
      >
        <Box sx={modalStyle}>
          <Typography
            id="member-modal-title"
            variant="h6"
            component="h2"
            sx={{ mb: 2 }}
          >
            Channel Members ({joinedChannels.length})
          </Typography>
          <List>
            {joinedChannels.length > 0 ? (
              joinedChannels.map((member) => (
                <ListItem key={member.id}>
                  <ListItemAvatar>
                    <Avatar alt={`${member.firstname} ${member.lastname}`} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={`${member.firstname} ${member.lastname}`}
                    secondary={
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 1 }}
                      >
                        <span style={{ fontSize: "0.875rem", color: "#666" }}>
                          {member.email}
                        </span>
                        <Chip
                          label={member.role === "ADMIN" ? "Admin" : "Member"}
                          size="small"
                          color={
                            member.role === "ADMIN" ? "primary" : "default"
                          }
                        />
                      </Box>
                    }
                  />
                </ListItem>
              ))
            ) : (
              <Typography>No members found</Typography>
            )}
          </List>
        </Box>
      </Modal>
    </>
  );
};

export default ChatHeader;
