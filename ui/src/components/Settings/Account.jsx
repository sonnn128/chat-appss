import React, { useState } from "react";
import { motion } from "framer-motion";
import { Avatar, Typography, Box, Button, TextField } from "@mui/material";
import { ExitToApp, Save, Cancel } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/stores/slices/authSlice";

const Account = () => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const handleLogout = () => {
    dispatch(logout());
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
                  margin="normal"
                />
                <TextField
                  fullWidth
                  label="Last Name"
                  name="lastname"
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
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mt: 0.5 }}
                >
                  <strong>Username:</strong> {user?.username || "N/A"}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mt: 0.5 }}
                >
                  <strong>Roles:</strong>{" "}
                  {user?.roles?.join(", ") || "No roles assigned"}
                </Typography>
              </>
            )}
          </Box>
        </Box>
        <Box sx={{ display: "flex", gap: 2 }}>
          {isEditing ? (
            <>
              <Button variant="contained" color="primary" startIcon={<Save />}>
                Save
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                startIcon={<Cancel />}
                onClick={() => {
                  setIsEditing(false);
                }}
              >
                Cancel
              </Button>
            </>
          ) : (
            <>
              <Button
                variant="contained"
                color="primary"
                onClick={() => setIsEditing(true)}
              >
                Edit Profile
              </Button>
              <Button
                variant="outlined"
                color="error"
                startIcon={<ExitToApp />}
                onClick={handleLogout}
              >
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
