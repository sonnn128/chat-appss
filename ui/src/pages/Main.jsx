import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Sidebar from "./components/Sidebar";
import ChatSection from "./components/ChatSection";
import { fetchAllChannels } from "../stores/middlewares/channelMiddleware";
import {
  fetchFriendList,
  fetchPendingRequests,
} from "../stores/middlewares/friendshipMiddleware";

function Main() {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth.user.id);
  useEffect(() => {
    dispatch(fetchFriendList(userId));
    dispatch(fetchPendingRequests(userId));
    dispatch(fetchAllChannels());
  }, []);

  return (
    <div className="flex h-screen bg-gray-100 font-sans antialiased overflow-hidden">
      <Sidebar />
      <ChatSection />
    </div>
  );
}

export default Main;
