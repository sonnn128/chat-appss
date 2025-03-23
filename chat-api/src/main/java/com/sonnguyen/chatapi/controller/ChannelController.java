package com.sonnguyen.chatapi.controller;

import com.sonnguyen.chatapi.model.Channel;
import com.sonnguyen.chatapi.model.User;
import com.sonnguyen.chatapi.model.membership.Membership;
import com.sonnguyen.chatapi.payload.response.ChannelResponse;
import com.sonnguyen.chatapi.payload.response.MemberResponse;
import com.sonnguyen.chatapi.repository.ChannelRepository;
import com.sonnguyen.chatapi.service.ChannelService;
import com.sonnguyen.chatapi.utils.SecurityUtils;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.stream.Collectors;

@Slf4j
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

    @GetMapping
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

    @PostMapping("/{channelId}/members")
    public ResponseEntity<Map<String, Object>> addMemberToChannel(
            @PathVariable UUID channelId,
            @RequestBody Map<String, List<UUID>> body){
        Map<String, Object> response = new HashMap<>();
        try{
            Map<String, Object> data = new HashMap<>();
            List<Membership> membershipList = channelService.addMemberToChannel(channelId, body.get("userIds"));
            List<MemberResponse> memberResponseList = membershipList.stream().map(membership -> {
                return MemberResponse.builder()
                        .id(membership.getUser().getId())
                        .email(membership.getUser().getEmail())
                        .username(membership.getUser().getUsername())
                        .firstname(membership.getUser().getFirstname())
                        .lastname(membership.getUser().getLastname())
                        .role(membership.getRole())
                        .status(membership.getStatus())
                        .joiningDate(membership.getJoiningDate())
                        .build();
            }).collect(Collectors.toList());
            data.put("newMembers", memberResponseList);
            data.put("channelId", channelId);
            response.put("data", data);
        }catch(Exception exception){
            response.put("error", exception.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{channelId}/requests")
    public ResponseEntity<List<MemberResponse>> getAllRequests(
            @PathVariable UUID channelId
    ){
        List<Membership> membershipList = channelService.getAllRequestsOfChannel(channelId);
        return ResponseEntity.ok(
                membershipList.stream().map(membership ->
                                MemberResponse.builder()
                                        .id(membership.getId().getUserId())
                                        .email(membership.getUser().getEmail())
                                        .username(membership.getUser().getUsername())
                                        .firstname(membership.getUser().getFirstname())
                                        .lastname(membership.getUser().getLastname())
                                        .role(membership.getRole())
                                        .status(membership.getStatus())
                                        .joiningDate(membership.getJoiningDate())
                                        .build())
                        .collect(Collectors.toList()));
    }

}
