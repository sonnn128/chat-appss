package com.sonnguyen.chatapi.service.impl;

import com.sonnguyen.chatapi.model.Channel;
import com.sonnguyen.chatapi.model.User;
import com.sonnguyen.chatapi.repository.ChannelRepository;
import com.sonnguyen.chatapi.repository.UserRepository;
import com.sonnguyen.chatapi.service.ChannelService;
import com.sonnguyen.chatapi.utils.SecurityUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class ChannelServiceImpl implements ChannelService {

    private final ChannelRepository channelRepository;
    private final UserRepository userRepository;

    @Override
    public Channel createChannel(String name) {
        if (!SecurityUtils.isAuthenticated()) {
            throw new IllegalStateException("User must be authenticated to create a channel");
        }

        User owner = SecurityUtils.getCurrentUser();

        Channel channel = new Channel(name, owner);
        return channelRepository.save(channel);
    }
}