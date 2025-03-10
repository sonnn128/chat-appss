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
} from "@mui/material";

const NotificationsSection = () => {
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
};

export default NotificationsSection;
