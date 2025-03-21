package com.sonnguyen.chat_server.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/ws")
public class WebSocketDebugController {
    @GetMapping("/info")
    public String debugInfo() {
        System.out.println("Received request to /ws/info");
        return "{\"entropy\": 123, \"origins\": [\"*:*\"], \"cookie_needed\": true, \"websocket\": true}";
    }
}
