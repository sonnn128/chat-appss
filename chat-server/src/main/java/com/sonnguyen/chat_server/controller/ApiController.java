package com.sonnguyen.chat_server.controller;

import com.sonnguyen.chat_server.model.ChannelMessage;
import com.sonnguyen.chat_server.service.ChannelMessageService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/messages")
public class ApiController {
    private final ChannelMessageService channelMessageService;
    @GetMapping("/{channelId}")
    public ResponseEntity<List<ChannelMessage>> getAllMessagesOfChannel(@PathVariable UUID channelId){
        return ResponseEntity.ok(channelMessageService.getAllMessagesOfChannel(channelId));
    }
}

