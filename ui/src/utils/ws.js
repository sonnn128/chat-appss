import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import { errorToast } from "./toast";

const chatServerUrl = import.meta.env.VITE_REACT_CHAT_SERVER_URL;

const stompClient = new Client({
  webSocketFactory: () => new SockJS(`${chatServerUrl}/ws`),
  onConnect: () => {
    console.log("Connected to WebSocket");
  },
});

stompClient.onStompError = (error) => {
  errorToast(JSON.stringify(error));
};
stompClient.activate();
export { stompClient };
