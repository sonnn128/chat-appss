package com.sonnguyen.chatapi.service;

import com.sonnguyen.chatapi.model.Channel;
import java.util.UUID;

public interface ChannelService {
    Channel createChannel(String name);
}