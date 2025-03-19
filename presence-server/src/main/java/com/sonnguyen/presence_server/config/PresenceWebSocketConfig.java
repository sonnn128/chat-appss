package com.sonnguyen.presence_server.config;

import com.sonnguyen.presence_server.websocket.PresenceWebSocketHandler;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;

@Configuration
@EnableWebSocket
public class PresenceWebSocketConfig implements WebSocketConfigurer {
    private final PresenceWebSocketHandler webSocketHandler;

    public PresenceWebSocketConfig(PresenceWebSocketHandler webSocketHandler) {
        this.webSocketHandler = webSocketHandler;
    }

    @Override
    public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
        registry.addHandler(webSocketHandler, "/ws/presence").setAllowedOrigins("*");
    }
}

