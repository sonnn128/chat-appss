import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import Sidebar from "./components/Sidebar";
import ChatSection from "./components/ChatSection";
import { fetchAllChannels } from "../stores/middlewares/channelMiddleware";
import {
  fetchFriendList,
  fetchFriendSuggestions,
  fetchPendingRequests,
} from "../stores/middlewares/friendshipMiddleware";

function Main() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchFriendList());
    dispatch(fetchPendingRequests());
    dispatch(fetchFriendSuggestions());
    dispatch(fetchAllChannels());
    dispatch(fetchFriendList())
  }, []);

  return (
    <div className="flex h-screen bg-gray-100 font-sans antialiased overflow-hidden">
      <Sidebar />
      <ChatSection />
    </div>
  );
}

export default Main;
