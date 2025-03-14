package com.sonnguyen.chat_server.service;

import com.sonnguyen.chat_server.model.ChannelMessage;
import com.sonnguyen.chat_server.repository.ChannelMessageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ChannelMessageService {
    private final ChannelMessageRepository channelMessageRepository;

    public List<ChannelMessage> getAllMessagesOfChannel(UUID channelId){
        return channelMessageRepository.findAllByKeyChannelIdOrderByKeyMessageIdAsc(channelId);
    }
}
