import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Avatar, Typography, Box, Button, TextField } from "@mui/material";
import { ExitToApp, Save, Cancel } from "@mui/icons-material";
import userService from "../services/userService";
import { successToast, errorToast } from "../utils/toast";

const Account = ({ user, handleLogout }) => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState({
    firstname: user?.firstname || "",
    lastname: user?.lastname || "",
  });

  const handleEditClick = () => setIsEditing(true);

  const handleCancel = () => {
    setIsEditing(false);
    setEditedUser({
      firstname: user?.firstname || "",
      lastname: user?.lastname || "",
    });
  };

  const handleSave = async () => {
    try {
      await userService.updateUserProfile(editedUser);
      successToast("Profile updated successfully!");
      setIsEditing(false);
      navigate("/");
    } catch (error) {
      errorToast("Failed to update profile");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Box sx={{ p: 4 }}>
        <Typography variant="h5" sx={{ fontWeight: "bold", mb: 3 }}>
          Account Settings
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", gap: 3, mb: 4 }}>
          <Avatar sx={{ width: 80, height: 80, bgcolor: "#FF6F61" }}>
            {user?.firstname?.[0]}
            {user?.lastname?.[0]}
          </Avatar>
          <Box sx={{ width: "100%" }}>
            {isEditing ? (
              <>
                <TextField
                  fullWidth
                  label="First Name"
                  name="firstname"
                  value={editedUser.firstname}
                  onChange={handleChange}
                  margin="normal"
                />
                <TextField
                  fullWidth
                  label="Last Name"
                  name="lastname"
                  value={editedUser.lastname}
                  onChange={handleChange}
                  margin="normal"
                />
              </>
            ) : (
              <>
                <Typography variant="h6" sx={{ fontWeight: "medium", mb: 1 }}>
                  {user?.firstname} {user?.lastname}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <strong>Email:</strong> {user?.email}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                  <strong>Username:</strong> {user?.username || "N/A"}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                  <strong>Roles:</strong> {user?.roles?.join(", ") || "No roles assigned"}
                </Typography>
              </>
            )}
          </Box>
        </Box>
        <Box sx={{ display: "flex", gap: 2 }}>
          {isEditing ? (
            <>
              <Button variant="contained" color="primary" startIcon={<Save />} onClick={handleSave}>
                Save
              </Button>
              <Button variant="outlined" color="secondary" startIcon={<Cancel />} onClick={handleCancel}>
                Cancel
              </Button>
            </>
          ) : (
            <>
              <Button variant="contained" color="primary" onClick={handleEditClick}>
                Edit Profile
              </Button>
              <Button variant="outlined" color="error" startIcon={<ExitToApp />} onClick={handleLogout}>
                Log Out
              </Button>
            </>
          )}
        </Box>
      </Box>
    </motion.div>
  );
};

export default Account;
