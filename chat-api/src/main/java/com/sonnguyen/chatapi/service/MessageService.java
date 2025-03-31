package com.sonnguyen.chatapi.service;

import com.sonnguyen.chatapi.payload.response.MessageResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.UUID;

@Slf4j
@Service
@RequiredArgsConstructor
public class MessageService {
    private final RestTemplate restTemplate;
    private static final String CHAT_SERVER_API_BASE = "http://chat-server/api/v1/messages/";

    public List<MessageResponse> fetchAllMessagesOfChannel(UUID channelId) {
        String apiUrl = CHAT_SERVER_API_BASE + channelId;
        MessageResponse[] messages = restTemplate.getForObject(apiUrl, MessageResponse[].class);
        log.warn("messages: " + messages.length);
        return messages != null ? Arrays.stream(messages).toList() : new ArrayList<>();
    }
}