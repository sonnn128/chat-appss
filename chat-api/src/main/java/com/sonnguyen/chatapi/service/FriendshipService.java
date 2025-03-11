package com.sonnguyen.chatapi.service;

import com.sonnguyen.chatapi.exception.CommonException;
import com.sonnguyen.chatapi.model.Friendship;
import com.sonnguyen.chatapi.model.User;
import com.sonnguyen.chatapi.model.enums.FriendshipStatus;
import com.sonnguyen.chatapi.repository.FriendshipRepository;
import com.sonnguyen.chatapi.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class FriendshipService {
    private final UserRepository userRepository;
    private final FriendshipRepository friendshipRepository;

    public String sendFriendRequest(UUID senderId, UUID receiverId) {
        User sender = getUserById(senderId);
        User receiver = getUserById(receiverId);

        if (friendshipRepository.existsByUserAndFriend(sender, receiver)) {
            throw new CommonException("Bạn đã gửi lời mời trước đó!", HttpStatus.BAD_REQUEST);
        }

        Friendship friendship = Friendship.builder()
                .user(sender)
                .friend(receiver)
                .status(FriendshipStatus.PENDING)
                .build();

        friendshipRepository.save(friendship);
        return "Lời mời kết bạn đã được gửi!";
    }

    public List<User> getFriends(UUID userId) {
        User user = getUserById(userId);
        return friendshipRepository.findByUserAndStatus(user, FriendshipStatus.ACCEPTED)
                .stream()
                .map(Friendship::getFriend)
                .collect(Collectors.toList());
    }

    public List<Friendship> getPendingRequests(UUID userId) {
        return friendshipRepository.findByFriendAndStatus(getUserById(userId), FriendshipStatus.PENDING);
    }

    public String respondToFriendRequest(UUID requestId, boolean accept) {
        Friendship friendship = friendshipRepository.findById(requestId)
                .orElseThrow(() -> new CommonException("Lời mời kết bạn không tồn tại!", HttpStatus.BAD_REQUEST));

        if (accept) {
            friendship.setStatus(FriendshipStatus.ACCEPTED);
            friendshipRepository.save(friendship);
            return "Đã chấp nhận lời mời kết bạn!";
        } else {
            friendshipRepository.delete(friendship);
            return "Đã từ chối lời mời kết bạn!";
        }
    }

    private User getUserById(UUID userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new CommonException("User không tồn tại!", HttpStatus.BAD_REQUEST));
    }

    public String unfriend(UUID userId, UUID friendId) {
        User user = getUserById(userId);
        User friend = getUserById(friendId);
        Friendship friendship = (Friendship) friendshipRepository.findByUserAndFriendAndStatus(user, friend, FriendshipStatus.ACCEPTED)
                .orElseThrow(() -> new CommonException("Không phải bạn bè!", HttpStatus.BAD_REQUEST));
        friendshipRepository.delete(friendship);
        return "Đã hủy kết bạn!";
    }
}
