import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
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
import Account from "../components/Settings/Account";
import NotificationsSection from "../components/Settings/Notifications";
import Privacy from "../components/Settings/Privacy";
import Appearance from "../components/Settings/Appearance";

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
    <Box sx={{ display: "flex", height: "100vh", bgcolor: "#f0f2f5" }}>
      {/* Sidebar trái */}
      <motion.div
        initial={{ x: -500 }}
        animate={{ x: 0 }}
        transition={{ type: "spring", stiffness: 100 }}
        sx={{
          width: 360, // Giảm chiều rộng giống Messenger
          bgcolor: "white",
          borderRight: 1,
          borderColor: "grey.200",
          display: "flex",
          flexDirection: "column",
          boxShadow: "0 1px 2px rgba(0,0,0,0.1)",
        }}
      >
        {/* Tiêu đề */}
        <Box
          sx={{
            p: 2,
            borderBottom: 1,
            borderColor: "grey.200",
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          <Link to="/">
            <IconButton sx={{ color: "#050505", p: 0.5 }}>
              <ArrowBack />
            </IconButton>
          </Link>
          <Typography
            variant="h6"
            sx={{ fontWeight: "bold", color: "#050505" }}
          >
            Settings
          </Typography>
        </Box>

        {/* Danh sách tùy chọn */}
        <List sx={{ flex: 1, py: 0 }}>
          {sections.map((section) => (
            <ListItem
              key={section.name}
              onClick={() => setSelectedSection(section.name)}
              sx={{
                py: 1.5,
                px: 3,
                bgcolor:
                  selectedSection === section.name ? "#e7f3ff" : "transparent",
                color: "#050505",
                "&:hover": {
                  bgcolor:
                    selectedSection === section.name ? "#e7f3ff" : "grey.100",
                },
                cursor: "pointer",
                transition: "background-color 0.2s",
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 40,
                  color:
                    selectedSection === section.name ? "#1877f2" : "#65676b",
                }}
              >
                {section.icon}
              </ListItemIcon>
              <ListItemText
                primary={section.name}
                primaryTypographyProps={{
                  fontWeight:
                    selectedSection === section.name ? "bold" : "medium",
                  color: "#050505",
                }}
              />
            </ListItem>
          ))}
        </List>
      </motion.div>

      {/* Khu vực nội dung */}
      <Box
        sx={{
          flex: 1,
          bgcolor: "white",
          overflowY: "auto",
          p: 3,
          borderLeft: 1,
          borderColor: "grey.200",
        }}
      >
        {renderContent()}
      </Box>
    </Box>
  );
}

export default Settings;
