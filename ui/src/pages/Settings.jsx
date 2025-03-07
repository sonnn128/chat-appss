import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Avatar,
  IconButton,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Switch,
  Divider,
  Button,
  Box,
} from "@mui/material";
import {
  ArrowBack,
  AccountCircle,
  Notifications,
  Lock,
  Palette,
  DarkMode,
  LightMode,
  ExitToApp,
} from "@mui/icons-material";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../stores/slices/authSlice";
import { successToast } from "../utils/toast";

const sections = [
  { name: "Account", icon: <AccountCircle /> },
  { name: "Notifications", icon: <Notifications /> },
  { name: "Privacy", icon: <Lock /> },
  { name: "Appearance", icon: <Palette /> },
];

function Settings() {
  const [selectedSection, setSelectedSection] = useState("Account");
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user);
  console.log("user setting: ", user);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
    successToast("Log out successfully");
  };

  const renderContent = () => {
    switch (selectedSection) {
      case "Account":
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
                <Avatar 
                  sx={{ width: 80, height: 80, bgcolor: "#FF6F61" }}
                  // Using first letter of firstname and lastname as fallback
                  children={`${user?.firstname?.[0] || ''}${user?.lastname?.[0] || ''}`}
                />
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: "medium", mb: 1 }}>
                    {user?.firstname} {user?.lastname}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {user?.email}
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ display: "flex", gap: 2 }}>
                <Button
                  variant="contained"
                  color="primary"
                  aria-label="Edit profile"
                >
                  Edit Profile
                </Button>
                <Button
                  variant="outlined"
                  color="error"
                  startIcon={<ExitToApp />}
                  onClick={handleLogout}
                  aria-label="Log out"
                >
                  Log Out
                </Button>
              </Box>
            </Box>
          </motion.div>
        );

      // Rest of the cases remain unchanged
      case "Notifications":
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Box sx={{ p: 4 }}>
              <Typography variant="h5" sx={{ fontWeight: "bold", mb: 3 }}>
                Notifications
              </Typography>
              <List disablePadding>
                <ListItem sx={{ py: 1.5 }}>
                  <ListItemText
                    primary="Message Notifications"
                    secondary="Receive notifications for new messages"
                  />
                  <Switch defaultChecked />
                </ListItem>
                <Divider />
                <ListItem sx={{ py: 1.5 }}>
                  <ListItemText
                    primary="Sound"
                    secondary="Play sound for new messages"
                  />
                  <Switch defaultChecked />
                </ListItem>
              </List>
            </Box>
          </motion.div>
        );

      case "Privacy":
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Box sx={{ p: 4 }}>
              <Typography variant="h5" sx={{ fontWeight: "bold", mb: 3 }}>
                Privacy Settings
              </Typography>
              <List disablePadding>
                <ListItem sx={{ py: 1.5 }}>
                  <ListItemText primary="Who can see my status?" />
                  <Typography variant="body2" color="primary">
                    Everyone
                  </Typography>
                </ListItem>
                <Divider />
                <ListItem sx={{ py: 1.5 }}>
                  <ListItemText primary="Block Contacts" />
                  <Button color="primary" variant="text">
                    Manage
                  </Button>
                </ListItem>
              </List>
            </Box>
          </motion.div>
        );

      case "Appearance":
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Box sx={{ p: 4 }}>
              <Typography variant="h5" sx={{ fontWeight: "bold", mb: 3 }}>
                Appearance
              </Typography>
              <List disablePadding>
                <ListItem sx={{ py: 1.5 }}>
                  <ListItemText primary="Dark Mode" />
                  <Switch
                    checked={darkMode}
                    onChange={() => setDarkMode(!darkMode)}
                  />
                </ListItem>
                <Divider />
                <ListItem sx={{ py: 1.5 }}>
                  <ListItemIcon>
                    {darkMode ? <DarkMode /> : <LightMode />}
                  </ListItemIcon>
                  <ListItemText
                    primary={darkMode ? "Dark Theme" : "Light Theme"}
                  />
                </ListItem>
              </List>
            </Box>
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <Box sx={{ display: "flex", height: "100vh", bgcolor: "grey.100" }}>
      <motion.div
        initial={{ x: -500 }}
        animate={{ x: 0 }}
        transition={{ type: "spring", stiffness: 100 }}
        sx={{
          width: 500,
          bgcolor: "background.paper",
          borderRight: 1,
          borderColor: "divider",
          display: "flex",
          flexDirection: "column",
          boxShadow: 1,
        }}
      >
        <Box
          sx={{
            p: 3,
            bgcolor: "primary.main",
            color: "white",
            display: "flex",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Link to="/">
            <IconButton sx={{ color: "white" }} aria-label="Back">
              <ArrowBack />
            </IconButton>
          </Link>
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            Settings
          </Typography>
        </Box>
        <List sx={{ flex: 1, py: 2 }}>
          {sections.map((section) => (
            <ListItem
              key={section.name}
              onClick={() => setSelectedSection(section.name)}
              sx={{
                py: 1.5,
                px: 3,
                bgcolor:
                  selectedSection === section.name
                    ? "primary.light"
                    : "transparent",
                color:
                  selectedSection === section.name
                    ? "primary.contrastText"
                    : "inherit",
                "&:hover": {
                  bgcolor:
                    selectedSection === section.name
                      ? "primary.light"
                      : "grey.100",
                },
                cursor: "pointer",
                transition: "background-color 0.2s",
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 40,
                  color:
                    selectedSection === section.name
                      ? "primary.contrastText"
                      : "inherit",
                }}
              >
                {section.icon}
              </ListItemIcon>
              <ListItemText primary={section.name} />
            </ListItem>
          ))}
        </List>
      </motion.div>

      <Box
        sx={{
          flex: 1,
          bgcolor: "background.paper",
          overflowY: "auto",
          p: 2,
        }}
      >
        {renderContent()}
      </Box>
    </Box>
  );
}

export default Settings;