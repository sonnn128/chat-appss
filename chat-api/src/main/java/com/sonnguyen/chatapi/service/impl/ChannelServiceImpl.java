package com.sonnguyen.chatapi.service.impl;

import com.sonnguyen.chatapi.exception.CommonException;
import com.sonnguyen.chatapi.model.*;
import com.sonnguyen.chatapi.model.membership.Membership;
import com.sonnguyen.chatapi.model.membership.MembershipKey;
import com.sonnguyen.chatapi.model.membership.Role;
import com.sonnguyen.chatapi.model.membership.Status;
import com.sonnguyen.chatapi.payload.response.ChannelResponse;
import com.sonnguyen.chatapi.payload.response.MemberResponse;
import com.sonnguyen.chatapi.repository.ChannelRepository;
import com.sonnguyen.chatapi.repository.MembershipRepository;
import com.sonnguyen.chatapi.repository.UserRepository;
import com.sonnguyen.chatapi.service.ChannelService;
import com.sonnguyen.chatapi.service.MessageService;
import com.sonnguyen.chatapi.utils.SecurityUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class ChannelServiceImpl implements ChannelService {

    private final ChannelRepository channelRepository;
    private final UserRepository userRepository;
    private final MembershipRepository membershipRepository;
    private final MessageService messageService;


    @Override
    public ChannelResponse createChannel(Channel channel) {
        User user = SecurityUtils.getCurrentUser();

        channel.setDateCreated(LocalDateTime.now());

        Channel newChannel = channelRepository.save(channel);

        Membership membership = membershipRepository.save(
                Membership.builder()
                        .id(new MembershipKey(newChannel.getId(), user.getId()))
                        .channel(newChannel)
                        .user(user)
                        .status(Status.ACCEPTED)
                        .role(Role.ADMIN)
                        .joiningDate(LocalDateTime.now())
                        .build()
        );

        return ChannelResponse.builder()
                .id(newChannel.getId())
                .name(newChannel.getName())
                .dateCreated(newChannel.getDateCreated())
                .build();
    }

    @Override
    public List<ChannelResponse> getAllChannelsOfUser(UUID userId) {
        List<ChannelResponse> result = new ArrayList<>();
        List<Membership> membershipList = membershipRepository
                .findAllByUserId(userId)
                .orElseThrow(() -> new CommonException("User not found", HttpStatus.BAD_REQUEST));
        for (Membership membership : membershipList) {
            result.add(ChannelResponse.builder()
                    .id(membership.getChannel().getId())
                    .name(membership.getChannel().getName())
                    .members(getAllMembersOfChannel(membership.getChannel().getId()))
                    .messages(messageService.fetchAllMessagesOfChannel(membership.getChannel().getId()))
                    .dateCreated(membership.getChannel().getDateCreated())
                    .build());
        }
        return result;
    }

    @Override
    public ChannelResponse getChannelById(UUID channelId) {
        return null;
    }

    @Override
    public ChannelResponse updateChannel(UUID channelId, Channel channel) {
        return null;
    }

    @Override
    public boolean deleteChannel(UUID channelId) {
        return false;
    }

    @Override
    public List<MemberResponse> getAllMembersOfChannel(UUID channelId) {
        List<MemberResponse> result = new ArrayList<>();
        List<Membership> membershipList = membershipRepository.findAllMembersByChannelId(channelId).orElseThrow();
        for (Membership membership : membershipList) {
            result.add(MemberResponse.builder()
                    .id(membership.getUser().getId())
                    .email(membership.getUser().getEmail())
                    .firstname(membership.getUser().getFirstname())
                    .lastname(membership.getUser().getLastname())
                    .role(membership.getRole())
                    .joiningDate(membership.getJoiningDate())
                    .status(membership.getStatus())
                    .build());
        }
        return result;
    }

    @Override
    public Membership requestJoinChannel(UUID channelId) {
        return null;
    }

    @Override
    public Membership acceptJoinChannel(UUID channelId, UUID memberId) {
        return null;
    }

    @Override
    public Membership declineJoinChannel(UUID channelId, UUID memberId) {
        return null;
    }

    @Override
    public List<Membership> getAllRequestsOfChannel(UUID channelId) {
        return membershipRepository.findAllRequestsByChannelId(channelId).orElseThrow();
    }

    @Override
    public List<Membership> addMemberToChannel(UUID channelId, List<UUID> userIds) {
        User admin = (User) SecurityUtils.getCurrentUser();
        Channel channel = channelRepository.findById(channelId).orElseThrow();
        Membership adminMembership = membershipRepository.findById(new MembershipKey(channelId, admin.getId())).orElseThrow();
        if (adminMembership.getRole() != Role.ADMIN) {
            return null;
        }
        return userIds.stream().map(userId -> {
            User user = userRepository.findById(userId).orElseThrow();
            return membershipRepository.save(Membership.builder()
                    .id(new MembershipKey(channelId, userId))
                    .channel(channel)
                    .user(user)
                    .joiningDate(LocalDateTime.now())
                    .role(Role.USER)
                    .status(Status.ACCEPTED)
                    .build());
        }).collect(Collectors.toList());
    }

    @Override
    public boolean leaveChannel(UUID userId, UUID channelId) {
        return false;
    }

    @Override
    public Membership setMemberRole(UUID userId, UUID channelId, Role role) {
        return null;
    }

    @Override
    public boolean deleteMember(UUID userId, UUID channelId) {
        return false;
    }

}