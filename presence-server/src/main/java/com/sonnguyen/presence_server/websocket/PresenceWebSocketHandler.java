package com.sonnguyen.presence_server.websocket;

import com.sonnguyen.presence_server.service.PresenceService;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;
import reactor.util.annotation.NonNull;

import java.util.Objects;

@Component
public class PresenceWebSocketHandler extends TextWebSocketHandler {
    private final PresenceService presenceService;

    public PresenceWebSocketHandler(PresenceService presenceService) {
        this.presenceService = presenceService;
    }

    @Override
    public void afterConnectionEstablished(@NonNull WebSocketSession session) {
        String userId = getUserIdFromSession(session);
        presenceService.setUserOnline(userId);
    }

    @Override
    public void afterConnectionClosed(@NonNull WebSocketSession session,@NonNull CloseStatus status) {
        String userId = getUserIdFromSession(session);
        presenceService.setUserOffline(userId);
    }

    private String getUserIdFromSession(WebSocketSession session) {
        // Giả sử userId được truyền qua query parameter
        String query = Objects.requireNonNull(session.getUri()).getQuery();
        return query.replace("userId=", "");
    }
}

