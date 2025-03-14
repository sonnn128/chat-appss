import React from "react";
import { motion } from "framer-motion";
import {
  Typography,
  Box,
  List,
  ListItem,
  ListItemText,
  Button,
  Divider,
} from "@mui/material";

const Privacy = () => {
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
};

export default Privacy;
