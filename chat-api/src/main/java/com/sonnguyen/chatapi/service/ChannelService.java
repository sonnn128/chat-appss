package com.sonnguyen.chatapi.service;

import com.sonnguyen.chatapi.model.Channel;
import com.sonnguyen.chatapi.payload.response.ChannelResponse;

import java.util.List;
import java.util.UUID;

public interface ChannelService {
    ChannelResponse createChannel(Channel channel);
    List<ChannelResponse> getAllChannelsOfUser(UUID userId);
}