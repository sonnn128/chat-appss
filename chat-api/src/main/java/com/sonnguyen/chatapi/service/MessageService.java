package com.sonnguyen.chatapi.service;

import com.sonnguyen.chatapi.payload.response.MessageResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.List;
import java.util.UUID;

@Slf4j
@Service
@RequiredArgsConstructor
public class MessageService {
    private final WebClient.Builder webClientBuilder;
    private final String chatServerHostname = System.getenv("CHAT_SERVER_HOST") == null ? "localhost" : System.getenv("CHAT_SERVER_HOST");
    private final int chatServerPort = Integer.parseInt(System.getenv("CHAT_SERVER_PORT") == null ? "8080" : System.getenv("CHAT_SERVER_PORT"));

    public List<MessageResponse> fetchAllMessagesOfChannel(UUID channelId) {
        String apiUrl = "http://" + chatServerHostname + ":" + chatServerPort + "/api/v1/messages/" + channelId;
        log.info("Fetching messages from URL: {}", apiUrl);

        WebClient webClient = webClientBuilder.baseUrl("http://" + chatServerHostname + ":" + chatServerPort).build();

        return webClient.get()
                .uri("/api/v1/messages/{channelId}", channelId)
                .retrieve()
                .bodyToFlux(MessageResponse.class)
                .collectList()
                .block(); // async list
    }
}
