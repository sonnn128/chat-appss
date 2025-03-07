import { useEffect } from 'react';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';

function WebSocketComponent() {
  useEffect(() => {
    const socket = new SockJS('http://localhost:8080/ws'); // Địa chỉ endpoint của Spring Backend
    const stompClient = Stomp.over(socket);

    // Kết nối đến Spring Backend
    stompClient.connect({}, (frame) => {
      console.log('Connected: ' + frame);

      // Đăng ký (subscribe) để nhận thông điệp từ Server
      stompClient.subscribe('/topic/messages', (message) => {
        console.log('Message received: ', JSON.parse(message.body));
      });

      // Gửi một thông điệp đến Server (nếu cần)
      stompClient.send('/app/sendMessage', {}, JSON.stringify({ content: 'Hello from React!' }));
    }, (error) => {
      console.error('Error: ', error);
    });

    // Ngắt kết nối khi component unmount
    return () => {
      if (stompClient) {
        stompClient.disconnect();
        console.log('Disconnected');
      }
    };
  }, []);

  return <div>WebSocket Connected!</div>;
}

export default WebSocketComponent;