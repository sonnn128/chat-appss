import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import { errorToast } from "./toast";

const chatServerUrl = import.meta.env.VITE_REACT_CHAT_SERVER_URL || "http://localhost:8080";

const stompClient = new Client({
  webSocketFactory: () => new SockJS(`${chatServerUrl}/ws`),
});

stompClient.onStompError = (error) => {
  errorToast(JSON.stringify(error));
};
export { stompClient };
