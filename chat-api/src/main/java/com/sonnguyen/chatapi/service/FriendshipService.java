package com.sonnguyen.chatapi.service;

import com.sonnguyen.chatapi.exception.CommonException;
import com.sonnguyen.chatapi.model.Friendship;
import com.sonnguyen.chatapi.model.User;
import com.sonnguyen.chatapi.model.enums.FriendshipStatus;
import com.sonnguyen.chatapi.payload.response.ApiResponse;
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

    public ApiResponse<?> sendFriendRequest(UUID senderId, UUID receiverId) {
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

        return ApiResponse.builder()
                .success(true)
                .message("Lời mời kết bạn đã được gửi!")
                .data("")
                .build();
    }

    public ApiResponse<?> getFriends(UUID userId) {
        User user = getUserById(userId);
        List<User> friends = friendshipRepository.findByUserAndStatus(user, FriendshipStatus.ACCEPTED)
                .stream()
                .map(Friendship::getFriend)
                .collect(Collectors.toList());

        return ApiResponse.<List<User>>builder()
                .success(true)
                .message("Danh sách bạn bè")
                .data(friends)
                .build();
    }

    public ApiResponse<?> getPendingRequests(UUID userId) {
        List<Friendship> pendingRequests = friendshipRepository.findByFriendAndStatus(getUserById(userId), FriendshipStatus.PENDING);

        return ApiResponse.builder()
                .success(true)
                .message("Danh sách lời mời kết bạn đang chờ")
                .data(pendingRequests)
                .build();
    }

    public ApiResponse<?> respondToFriendRequest(UUID requestId, boolean accept) {
        Friendship friendship = friendshipRepository.findById(requestId)
                .orElseThrow(() -> new CommonException("Lời mời kết bạn không tồn tại!", HttpStatus.BAD_REQUEST));

        if (accept) {
            friendship.setStatus(FriendshipStatus.ACCEPTED);
            friendshipRepository.save(friendship);
            return ApiResponse.<String>builder()
                    .success(true)
                    .message("Đã chấp nhận lời mời kết bạn!")
                    .data("")
                    .build();
        } else {
            friendshipRepository.delete(friendship);
            return ApiResponse.builder()
                    .success(true)
                    .message("Đã từ chối lời mời kết bạn!")
                    .data("")
                    .build();
        }
    }

    public ApiResponse<?> unfriend(UUID userId, UUID friendId) {
        User user = getUserById(userId);
        User friend = getUserById(friendId);

        Friendship friendship = (Friendship) friendshipRepository.findByUserAndFriendAndStatus(user, friend, FriendshipStatus.ACCEPTED)
                .orElseThrow(() -> new CommonException("Không phải bạn bè!", HttpStatus.BAD_REQUEST));

        friendshipRepository.delete(friendship);

        return ApiResponse.builder()
                .success(true)
                .message("Đã hủy kết bạn!")
                .data("")
                .build();
    }

    private User getUserById(UUID userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new CommonException("User không tồn tại!", HttpStatus.BAD_REQUEST));
    }
}
