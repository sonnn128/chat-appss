package com.sonnguyen.chatapi.controller;

import com.sonnguyen.chatapi.model.Channel;
import com.sonnguyen.chatapi.model.User;
import com.sonnguyen.chatapi.payload.response.ChannelResponse;
import com.sonnguyen.chatapi.payload.response.MemberResponse;
import com.sonnguyen.chatapi.repository.ChannelRepository;
import com.sonnguyen.chatapi.service.ChannelService;
import com.sonnguyen.chatapi.utils.SecurityUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/channels")
@RequiredArgsConstructor
public class ChannelController {

    private final ChannelService channelService;
    private final ChannelRepository channelRepository;

    @PostMapping
    public ChannelResponse createChannel(@RequestBody Channel channel) {
        return channelService.createChannel(channel);
    }

    @GetMapping("")
    public ResponseEntity<List<ChannelResponse>> getAllChannelsOfUser(
    ) {
        User user = SecurityUtils.getCurrentUser();
        return ResponseEntity.ok(channelService.getAllChannelsOfUser(user.getId()));
    }

    @GetMapping("/{channelId}/members")
    public ResponseEntity<List<MemberResponse>> getAllMembers(
            @PathVariable UUID channelId) {
        return ResponseEntity.ok(channelService.getAllMembersOfChannel(channelId));
    }

}
