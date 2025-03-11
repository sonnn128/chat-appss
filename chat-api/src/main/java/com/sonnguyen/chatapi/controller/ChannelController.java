package com.sonnguyen.chatapi.controller;

import com.sonnguyen.chatapi.model.Channel;
import com.sonnguyen.chatapi.payload.request.CreateChannelRequest;
import com.sonnguyen.chatapi.service.ChannelService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/channels")
@RequiredArgsConstructor
public class ChannelController {

    private final ChannelService channelService;

    @PostMapping
    public Channel createChannel(@RequestBody CreateChannelRequest request) {
        return channelService.createChannel(request.getName());
    }
}
