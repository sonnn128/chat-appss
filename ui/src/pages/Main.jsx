import React, { useState, useRef, useEffect } from "react";
import {
  Avatar,
  IconButton,
  TextField,
  Badge,
  Fade,
  Popper,
  Paper,
  Button,
} from "@mui/material";

import {
  ChatBubbleOutline,
  Settings, // Thay MoreVert bằng Settings
  MoreVert,
  Send,
  AttachFile,
  EmojiEmotions,
  Mic,
  Videocam,
  Phone,
  GroupAdd,
} from "@mui/icons-material";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom"; // Import Link để điều hướng

function Main() {
  const [search, setSearch] = useState("");
  const [message, setMessage] = useState("");
  const [emojiOpen, setEmojiOpen] = useState(false);
  const messagesEndRef = useRef(null);
  const emojiAnchorRef = useRef(null);

  const chats = [
    { id: 1, name: "John Doe", lastMessage: "Hey, how's it going?", time: "2 min ago", unread: 2, avatarColor: "#FF6F61", status: "online" },
    { id: 2, name: "Jane Smith", lastMessage: "See you tomorrow!", time: "1 hr ago", unread: 0, avatarColor: "#6B7280", status: "offline" },
    { id: 3, name: "Alex Johnson", lastMessage: "Check this out...", time: "3 hrs ago", unread: 1, avatarColor: "#10B981", status: "away" },
    { id: 4, name: "Emily Brown", lastMessage: "Thanks!", time: "Yesterday", unread: 0, avatarColor: "#8B5CF6", status: "online" },
  ];

  const messages = [
    { id: 1, text: "Hello! How can I help you today?", sender: "other", time: "10:30 AM" },
    { id: 2, text: "Hi! Just checking in.", sender: "me", time: "10:31 AM" },
  ];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex h-screen bg-gray-100 font-sans antialiased overflow-hidden">
      {/* Sidebar */}
      <motion.div
        initial={{ x: -300 }}
        animate={{ x: 0 }}
        transition={{ type: "spring", stiffness: 100 }}
        className="w-80 bg-white border-r flex flex-col"
      >
        <div className="p-4 bg-blue-600 text-white">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Messages</h2>
            <Link to="/settings"> {/* Sử dụng Link để điều hướng */}
              <IconButton sx={{ color: "white" }}>
                <Settings /> {/* Thay MoreVert bằng Settings */}
              </IconButton>
            </Link>
          </div>
        </div>

        {/* Search Bar & Create Group Button */}
        <div className="p-3 flex flex-col gap-2">
          <TextField
            variant="outlined"
            fullWidth
            placeholder="Search messages..."
            size="small"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            sx={{ "& .MuiOutlinedInput-root": { borderRadius: "20px", backgroundColor: "#f3f4f6" } }}
          />
          <Button
            variant="contained"
            startIcon={<GroupAdd />}
            sx={{ borderRadius: "20px", backgroundColor: "#3b82f6", textTransform: "none" }}
          >
            Create Group
          </Button>
        </div>

        {/* Chat List */}
        <div className="flex-1 overflow-y-auto px-2">
          {chats
            .filter((chat) => chat.name.toLowerCase().includes(search.toLowerCase()))
            .map((chat) => (
              <motion.div
                key={chat.id}
                whileHover={{ backgroundColor: "#f1f5f9" }}
                className="flex items-center p-3 rounded-lg cursor-pointer"
              >
                <Badge
                  color="primary"
                  badgeContent={chat.unread}
                  invisible={chat.unread === 0}
                >
                  <Avatar sx={{ width: 50, height: 50, bgcolor: chat.avatarColor }} />
                </Badge>
                <div className="ml-3 flex-1 min-w-0">
                  <div className="flex justify-between">
                    <p className="font-semibold text-gray-900 truncate">{chat.name}</p>
                    <p className="text-xs text-gray-500">{chat.time}</p>
                  </div>
                  <p className="text-sm text-gray-600 truncate">{chat.lastMessage}</p>
                </div>
              </motion.div>
            ))}
        </div>
      </motion.div>

      {/* Chat Box */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <motion.div
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ type: "spring", stiffness: 100 }}
          className="p-3 bg-white border-b flex items-center justify-between"
        >
          <div className="flex items-center">
            <Avatar sx={{ width: 40, height: 40, bgcolor: chats[0].avatarColor }} />
            <div className="ml-3">
              <h2 className="font-semibold text-lg text-gray-900">{chats[0].name}</h2>
              <p className="text-xs text-green-600">Online</p>
            </div>
          </div>
          <div className="flex gap-1">
            <IconButton color="primary"><Phone /></IconButton>
            <IconButton color="primary"><Videocam /></IconButton>
            <IconButton color="default"><MoreVert /></IconButton>
          </div>
        </motion.div>

        {/* Messages */}
        <div className="flex-1 p-4 bg-white overflow-y-auto flex flex-col gap-4">
          <AnimatePresence>
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${msg.sender === "me" ? "self-end" : "self-start"} items-end gap-2`}
              >
                {msg.sender === "other" && (
                  <Avatar sx={{ width: 32, height: 32, bgcolor: chats[0].avatarColor }} />
                )}
                <div
                  className={`px-4 py-2 rounded-2xl max-w-md ${
                    msg.sender === "me" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800"
                  }`}
                >
                  <p className="text-sm">{msg.text}</p>
                  <p className={`text-xs mt-1 ${msg.sender === "me" ? "text-blue-100 text-right" : "text-gray-500"}`}>
                    {msg.time}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <motion.div
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          transition={{ type: "spring", stiffness: 100 }}
          className="p-3 bg-white border-t"
        >
          <div className="flex items-center gap-2 bg-gray-100 rounded-full px-4 py-2">
            <IconButton color="primary" size="small">
              <AttachFile />
            </IconButton>
            <IconButton
              color="warning"
              size="small"
              ref={emojiAnchorRef}
              onClick={() => setEmojiOpen((prev) => !prev)}
            >
              <EmojiEmotions />
            </IconButton>
            <TextField
              variant="standard"
              fullWidth
              placeholder="Type a message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              InputProps={{ disableUnderline: true }}
            />
            {message ? (
              <IconButton color="primary" size="small">
                <Send />
              </IconButton>
            ) : (
              <IconButton color="default" size="small">
                <Mic />
              </IconButton>
            )}
          </div>

          {/* Emoji Popper */}
          <Popper open={emojiOpen} anchorEl={emojiAnchorRef.current} placement="top-start" transition>
            {({ TransitionProps }) => (
              <Fade {...TransitionProps}>
                <Paper sx={{ p: 1, borderRadius: "12px" }}>
                  <div className="grid grid-cols-6 gap-1">
                    {["😊", "😂", "❤️", "👍", "😍", "😢"].map((emoji) => (
                      <button
                        key={emoji}
                        className="text-xl hover:bg-gray-100 rounded-full p-1"
                        onClick={() => setMessage((prev) => prev + emoji)}
                      >
                        {emoji}
                      </button>
                    ))}
                  </div>
                </Paper>
              </Fade>
            )}
          </Popper>
        </motion.div>
      </div>
    </div>
  );
}

export default Main;