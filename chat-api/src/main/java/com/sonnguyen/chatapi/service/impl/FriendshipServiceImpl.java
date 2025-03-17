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
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

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
            throw new CommonException("Friend request already exists", HttpStatus.BAD_REQUEST);
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

        return friendshipRepository.save(friendship);
    }
    @Override
    @Transactional
    public Friendship acceptFriendRequest(UUID friendId) {
        UUID userId = SecurityUtils.getCurrentUser().getId(); // Lấy userId từ token

        Friendship friendship = friendshipRepository.findByUserIdAndFriendId(friendId, userId)
                .orElseGet(() -> friendshipRepository.findByUserIdAndFriendId(userId, friendId)
                        .orElseThrow(() -> new CommonException("Friend request not found", HttpStatus.NOT_FOUND)));

        if (friendship.getStatus() != FriendshipStatus.PENDING) {
            throw new CommonException("Invalid friend request status", HttpStatus.BAD_REQUEST);
        }

        friendship.setStatus(FriendshipStatus.ACCEPTED);
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
    public List<Friendship> getPendingRequests() {
        UUID userId = SecurityUtils.getCurrentUser().getId(); // Lấy userId từ token

        return friendshipRepository.findByUserIdAndStatus(userId, FriendshipStatus.PENDING);
    }
}
