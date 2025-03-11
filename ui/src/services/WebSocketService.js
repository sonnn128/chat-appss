import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";

const SOCKET_URL = "http://localhost:8080/ws"; // Thay bằng URL backend của bạn

class WebSocketService {
  constructor() {
    this.client = new Client({
      webSocketFactory: () => new SockJS(SOCKET_URL),
      reconnectDelay: 5000, 
      debug: (msg) => console.log(msg),
    });

    this.client.onConnect = () => {
      console.log("Connected to WebSocket");
      this.client.subscribe("/topic/messages", (message) => {
        console.log("Received message:", JSON.parse(message.body));
      });
    };

    this.client.onStompError = (frame) => {
      console.error("Broker reported error:", frame.headers["message"]);
    };

    this.client.activate();
  }

  sendMessage(message) {
    if (this.client.connected) {
      this.client.publish({
        destination: "/app/sendMessage",
        body: JSON.stringify(message),
      });
    }
  }
}

const webSocketService = new WebSocketService();
export default webSocketService;
