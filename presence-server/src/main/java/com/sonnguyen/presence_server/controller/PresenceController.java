package com.sonnguyen.presence_server.controller;

import com.sonnguyen.presence_server.service.PresenceService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Set;

@RestController
@RequestMapping("/api/v1/presence")
public class PresenceController {
    private final PresenceService presenceService;

    public PresenceController(PresenceService presenceService) {
        this.presenceService = presenceService;
    }

    @GetMapping("/is-online/{userId}")
    public ResponseEntity<Boolean> isUserOnline(@PathVariable String userId) {
        return ResponseEntity.ok(presenceService.isUserOnline(userId));
    }

    @GetMapping("/online-users")
    public ResponseEntity<Set<String>> getOnlineUsers() {
        return ResponseEntity.ok(presenceService.getOnlineUsers());
    }
}

