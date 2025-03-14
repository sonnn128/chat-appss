import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllChannels } from "../../../stores/middlewares/channelMiddleware";

function Test() {
  const channels = useSelector((state) => state.channel.channels);
  const dispatch = useDispatch();
  useEffect(() => {
    // const func = async () => {
    //   const res = await dispatch(fetchAllChannels()).unwrap();
    //   console.log("Res test: ", res);
    // };
    // func();
    dispatch(fetchAllChannels());
  }, []);
  console.log("channels: ", channels);

  return <div></div>;
}

export default Test;
