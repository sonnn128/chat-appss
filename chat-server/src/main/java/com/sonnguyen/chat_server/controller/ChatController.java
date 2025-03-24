package com.sonnguyen.chat_server.controller;

import com.datastax.oss.driver.api.core.uuid.Uuids;
import com.sonnguyen.chat_server.model.ChannelMessage;
import com.sonnguyen.chat_server.repository.ChannelMessageRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

import java.util.UUID;

@Slf4j
@Controller
@RequiredArgsConstructor
public class ChatController {
    private final ChannelMessageRepository repository;

    @MessageMapping("/clientSend")
    @SendTo("/topic/public")
    public String clientSend(@Payload String message) {
        log.warn(message);
        return message;
    }

    @MessageMapping("/channels/{channelId}")
    @SendTo("/channels/{channelId}")
    public ChannelMessage sendChannelMessage(
            @DestinationVariable UUID channelId,
            @Payload ChannelMessage channelMessage
    ) {
        log.info("channelId: {}, message: {}", channelId);
        channelMessage.getKey().setMessageId(Uuids.timeBased());
        System.out.println(channelMessage.toString());
        return repository.save(channelMessage);
    }
}

