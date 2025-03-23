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
    final private RestTemplate restTemplate;
    private final String chatServerHostname = System.getenv("CHAT_SERVER_HOST")==null?"localhost":System.getenv("CHAT_SERVER_HOST");
    private final int chatServerPort = Integer.parseInt(System.getenv("CHAT_SERVER_PORT")==null?"8083":System.getenv("CHAT_SERVER_PORT"));

    public List<MessageResponse> fetchAllMessagesOfChannel(UUID channelId){
        String apiUrl = "http://" + chatServerHostname + ":" + chatServerPort + "/api/v1/messages/" + channelId;
        MessageResponse[] messages = restTemplate.getForObject(apiUrl, MessageResponse[].class);
        if (messages != null) {
            return Arrays.stream(messages).toList();
        }
        return new ArrayList<>();
    }
}
