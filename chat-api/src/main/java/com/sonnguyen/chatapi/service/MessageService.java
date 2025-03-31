package com.sonnguyen.chatapi.service;

import com.sonnguyen.chatapi.payload.response.MessageResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.UUID;
@Service
@RequiredArgsConstructor
public class MessageService {
    private final RestTemplate restTemplate;
    private static final String CHAT_SERVER_API_BASE = "http://chat-server/api/v1/messages/";

    public List<MessageResponse> fetchAllMessagesOfChannel(UUID channelId) {
        try {
            String apiUrl = CHAT_SERVER_API_BASE + channelId;
            MessageResponse[] messages = restTemplate.getForObject(apiUrl, MessageResponse[].class);
            return messages != null ? Arrays.stream(messages).toList() : new ArrayList<>();
        } catch (Exception e) {
            // Log the error and return empty list or throw a custom exception
            return new ArrayList<>();
        }
    }
}