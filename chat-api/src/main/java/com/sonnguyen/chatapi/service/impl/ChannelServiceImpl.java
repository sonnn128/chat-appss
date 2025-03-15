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
import com.sonnguyen.chatapi.utils.SecurityUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@RequiredArgsConstructor
@Service
public class ChannelServiceImpl implements ChannelService {

    private final ChannelRepository channelRepository;
    private final UserRepository userRepository;
    private final MembershipRepository membershipRepository;


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
        for(Membership membership : membershipList){
            result.add(ChannelResponse.builder()
                    .id(membership.getChannel().getId())
                    .name(membership.getChannel().getName())
                    .dateCreated(membership.getChannel().getDateCreated())
                    .build());
        }
        return result;
    }

    @Override
    public List<MemberResponse> getAllMembersOfChannel(UUID channelId) {
        List<MemberResponse> result = new ArrayList<>();
        List<Membership> membershipList = membershipRepository.findAllMembersByChannelId(channelId).orElseThrow();
        for(Membership membership : membershipList){
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

}