package com.sonnguyen.chatapi.service.impl;

import com.sonnguyen.chatapi.exception.CommonException;
import com.sonnguyen.chatapi.model.User;
import com.sonnguyen.chatapi.model.friendship.Friendship;
import com.sonnguyen.chatapi.model.friendship.FriendshipKey;
import com.sonnguyen.chatapi.model.friendship.FriendshipStatus;
import com.sonnguyen.chatapi.repository.FriendshipRepository;
import com.sonnguyen.chatapi.repository.UserRepository;
import com.sonnguyen.chatapi.service.FriendshipService;
import com.sonnguyen.chatapi.utils.SecurityUtils;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Slf4j
@Service
@RequiredArgsConstructor
public class FriendshipServiceImpl implements FriendshipService {
    private final FriendshipRepository friendshipRepository;
    private final UserRepository userRepository;
    @Override
    @Transactional
    public Friendship sendFriendRequest(UUID friendId) {
        UUID userId = SecurityUtils.getCurrentUser().getId(); // Lấy userId từ token

        if (userId.equals(friendId)) {
            throw new CommonException("Cannot add yourself as a friend", HttpStatus.BAD_REQUEST);
        }

        if (friendshipRepository.existsByUserIdAndFriendId(userId, friendId) ||
                friendshipRepository.existsByUserIdAndFriendId(friendId, userId)) {
            throw new CommonException("Friend request already exists or you are already friends", HttpStatus.BAD_REQUEST);
        }

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new CommonException("User not found", HttpStatus.NOT_FOUND));
        User friend = userRepository.findById(friendId)
                .orElseThrow(() -> new CommonException("Friend not found", HttpStatus.NOT_FOUND));

        Friendship friendship = Friendship.builder()
                .id(new FriendshipKey(userId, friendId))
                .user(user)
                .friend(friend)
                .status(FriendshipStatus.PENDING)
                .build();

        log.info("Sending friend request from user {} to friend {}", userId, friendId);
        return friendshipRepository.save(friendship);
    }
    public List<User> getFriendSuggestions() {
        UUID userId = SecurityUtils.getCurrentUser().getId();
        return userRepository.findSuggestedFriends(userId);
    }

    @Override
    @Transactional
    public Friendship acceptFriendRequest(UUID friendId) {
        UUID userId = SecurityUtils.getCurrentUser().getId(); // Lấy userId từ token

        log.info("Accepting friend request from user {} to friend {}", userId, friendId);

        Friendship friendship = friendshipRepository.findByUserIdAndFriendId(friendId, userId)
                .orElseThrow(() -> new CommonException("Friend request not found", HttpStatus.NOT_FOUND));

        if (friendship.getStatus() != FriendshipStatus.PENDING) {
            throw new CommonException("Invalid friend request status", HttpStatus.BAD_REQUEST);
        }

        friendship.setStatus(FriendshipStatus.ACCEPTED);
        log.info("User {} accepted friend request from {}", userId, friendId);
        return friendshipRepository.save(friendship);
    }

    @Override
    @Transactional
    public void removeFriend(UUID friendId) {
        UUID userId = SecurityUtils.getCurrentUser().getId(); // Lấy userId từ token


        friendshipRepository.findByUserIdAndFriendId(userId, friendId)
                .ifPresent(friendshipRepository::delete);
        friendshipRepository.findByUserIdAndFriendId(friendId, userId)
                .ifPresent(friendshipRepository::delete);
    }
    @Override
    public List<User> getFriends() {
        UUID userId = SecurityUtils.getCurrentUser().getId(); // Lấy userId từ token
        return friendshipRepository.findFriends(userId);
    }

    @Override
    public List<User> getPendingRequests() {
        UUID userId = SecurityUtils.getCurrentUser().getId();

        List<Friendship> pendingRequests = friendshipRepository.findPendingRequestsForUser(userId);

        List<User> pendingUsers = pendingRequests.stream()
                .map(Friendship::getUser) // Lấy user là người gửi lời mời
                .toList();

        log.info("User {} có {} lời mời kết bạn đang chờ: {}", userId, pendingUsers.size(), pendingUsers);
        return pendingUsers;
    }



}
