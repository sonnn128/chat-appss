import React from "react";
import { motion } from "framer-motion";
import {
  Typography,
  Box,
  List,
  ListItem,
  ListItemText,
  Switch,
  Divider,
  ListItemIcon,
} from "@mui/material";
import { DarkMode, LightMode } from "@mui/icons-material";

const Appearance = ({ darkMode, setDarkMode }) => {
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
            <ListItemText primary={darkMode ? "Dark Theme" : "Light Theme"} />
          </ListItem>
        </List>
      </Box>
    </motion.div>
  );
};

export default Appearance;
