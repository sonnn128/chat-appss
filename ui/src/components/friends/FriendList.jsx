import React from "react";
import {
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Typography,
} from "@mui/material";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentFriend } from "@/stores/slices/friendshipSlice";
import { removeCurrentChannel } from "@/stores/slices/channelSlice";

const FriendList = () => {
  const dispatch = useDispatch();
  const friends = useSelector((state) => state.friendship.friends);

  const handleSelectFriend = (friend) => {
    dispatch(setCurrentFriend(friend)); 
    dispatch(removeCurrentChannel());
  };

  return (
    <div className="mt-4">
      <Typography
        variant="subtitle2"
        className="text-sm font-semibold text-gray-600 mb-2"
      >
        Friends
      </Typography>
      {friends && friends.length > 0 ? (
        <List dense>
          {friends.map((friend) => {
            return (
              <motion.div
                key={friend.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <ListItem
                  button="true"
                  onClick={() => handleSelectFriend(friend)}
                  sx={{
                    borderRadius: "10px",
                    "&:hover": { backgroundColor: "#f0f2f5" },
                    padding: "8px 12px",
                  }}
                >
                  <ListItemAvatar>
                    <Avatar
                      sx={{ width: 36, height: 36 }}
                      alt={`${friend.firstname} ${friend.lastname}`}
                    >
                      {friend.firstname.charAt(0)}
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Typography
                        variant="body1"
                        sx={{ fontWeight: 500, color: "#050505" }}
                      >
                        {`${friend.firstname} ${friend.lastname}`}
                      </Typography>
                    }
                    secondary={
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {friend.email}
                      </Typography>
                    }
                  />
                </ListItem>
              </motion.div>
            );
          })}
        </List>
      ) : (
        <Typography variant="body2" color="text.secondary">
          No friends to display
        </Typography>
      )}
    </div>
  );
};

export default FriendList;
