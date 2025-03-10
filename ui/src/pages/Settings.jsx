// Settings.jsx
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
  Box,
} from "@mui/material";
import {
  ArrowBack,
  AccountCircle,
  Notifications,
  Lock,
  Palette,
} from "@mui/icons-material";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../stores/slices/authSlice";
import { successToast } from "../utils/toast";
import Account from "../components/Account";
import NotificationsSection from "../components/Notifications";
import Privacy from "../components/Privacy";
import Appearance from "../components/Appearance";

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
  const user = useSelector((state) => state.auth.user);
  console.log("user setting: ", user);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
    successToast("Log out successfully");
  };

  const renderContent = () => {
    switch (selectedSection) {
      case "Account":
        return <Account user={user} handleLogout={handleLogout} />;
      case "Notifications":
        return <NotificationsSection />;
      case "Privacy":
        return <Privacy />;
      case "Appearance":
        return <Appearance darkMode={darkMode} setDarkMode={setDarkMode} />;
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
