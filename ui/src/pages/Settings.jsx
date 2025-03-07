import React, { useState } from "react";
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
} from "@mui/material";
import {
  ArrowBack,
  AccountCircle,
  Notifications,
  Lock,
  Palette,
  DarkMode,
  LightMode,
} from "@mui/icons-material";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

function Settings() {
  const [selectedSection, setSelectedSection] = useState("Account");
  const [darkMode, setDarkMode] = useState(false);

  const sections = [
    { name: "Account", icon: <AccountCircle /> },
    { name: "Notifications", icon: <Notifications /> },
    { name: "Privacy", icon: <Lock /> },
    { name: "Appearance", icon: <Palette /> },
  ];

  const renderContent = () => {
    switch (selectedSection) {
      case "Account":
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="p-6"
          >
            <Typography variant="h5" className="font-bold text-gray-900 mb-4">
              Account Settings
            </Typography>
            <div className="flex items-center gap-4 mb-6">
              <Avatar sx={{ width: 80, height: 80, bgcolor: "#FF6F61" }} />
              <div>
                <Typography variant="h6" className="text-gray-900 font-semibold">
                  John Doe
                </Typography>
                <Typography variant="body2" className="text-gray-600">
                  john.doe@example.com
                </Typography>
              </div>
            </div>
            <button className="px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-all">
              Edit Profile
            </button>
          </motion.div>
        );
      case "Notifications":
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="p-6"
          >
            <Typography variant="h5" className="font-bold text-gray-900 mb-4">
              Notifications
            </Typography>
            <List>
              <ListItem>
                <ListItemText primary="Message Notifications" secondary="Receive notifications for new messages" />
                <Switch defaultChecked />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemText primary="Sound" secondary="Play sound for new messages" />
                <Switch defaultChecked />
              </ListItem>
            </List>
          </motion.div>
        );
      case "Privacy":
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="p-6"
          >
            <Typography variant="h5" className="font-bold text-gray-900 mb-4">
              Privacy Settings
            </Typography>
            <List>
              <ListItem>
                <ListItemText primary="Who can see my status?" />
                <Typography variant="body2" className="text-blue-500">
                  Everyone
                </Typography>
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemText primary="Block Contacts" />
                <button className="text-blue-500 hover:underline">Manage</button>
              </ListItem>
            </List>
          </motion.div>
        );
      case "Appearance":
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="p-6"
          >
            <Typography variant="h5" className="font-bold text-gray-900 mb-4">
              Appearance
            </Typography>
            <List>
              <ListItem>
                <ListItemText primary="Dark Mode" />
                <Switch checked={darkMode} onChange={() => setDarkMode(!darkMode)} />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemIcon>{darkMode ? <DarkMode /> : <LightMode />}</ListItemIcon>
                <ListItemText primary={darkMode ? "Dark Theme" : "Light Theme"} />
              </ListItem>
            </List>
          </motion.div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100 font-sans antialiased overflow-hidden">
      {/* Sidebar */}
      <motion.div
        initial={{ x: -300 }}
        animate={{ x: 0 }}
        transition={{ type: "spring", stiffness: 100 }}
        className="w-64 bg-white border-r flex flex-col"
      >
        <div className="p-4 bg-blue-600 text-white flex items-center gap-2">
          <Link to="/">
            <IconButton sx={{ color: "white" }}>
              <ArrowBack />
            </IconButton>
          </Link>
          <Typography variant="h6" className="font-bold">
            Settings
          </Typography>
        </div>
        <List className="flex-1">
          {sections.map((section) => (
            <ListItem
              key={section.name}
              button
              onClick={() => setSelectedSection(section.name)}
              sx={{
                bgcolor: selectedSection === section.name ? "#f1f5f9" : "transparent",
                "&:hover": { bgcolor: "#f1f5f9" },
              }}
            >
              <ListItemIcon>{section.icon}</ListItemIcon>
              <ListItemText primary={section.name} />
            </ListItem>
          ))}
        </List>
      </motion.div>

      {/* Content */}
      <div className="flex-1 bg-white overflow-y-auto">{renderContent()}</div>
    </div>
  );
}

export default Settings;