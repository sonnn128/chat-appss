package com.sonnguyen.chat_server.controller;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
public class ChatController {
    @MessageMapping("/clientSend")
    @SendTo("/topic/public")
    public String clientSend(@Payload String message) {
        return message;
    }
}
