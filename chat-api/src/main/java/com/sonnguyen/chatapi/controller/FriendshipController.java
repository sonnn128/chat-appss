package com.sonnguyen.chatapi.controller;

import com.sonnguyen.chatapi.model.User;
import com.sonnguyen.chatapi.model.friendship.Friendship;
import com.sonnguyen.chatapi.payload.response.ApiResponse;
import com.sonnguyen.chatapi.repository.FriendshipRepository;
import com.sonnguyen.chatapi.service.FriendShipService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@Slf4j
@RestController
@RequestMapping("/api/v1/friendships")
@RequiredArgsConstructor
public class FriendshipController {
    private final FriendShipService friendShipService;
    private final FriendshipRepository friendshipRepository;

    @PostMapping("/request/{friendId}")
    public ApiResponse<Friendship> sendFriendRequest(
            @PathVariable UUID friendId) {
        log.info("friendID: " + friendId);
        Friendship friendship = friendShipService.sendFriendRequest(friendId);
        return ApiResponse.<Friendship>builder()
                .success(true)
                .message("Friend request sent successfully")
                .data(friendship)
                .build();
    }

    @PutMapping("/accept/{friendId}")
    public ApiResponse<Friendship> acceptFriendRequest(
            @PathVariable UUID friendId) {
        log.info("friendIDputmapping: " + friendId);
        Friendship friendship = friendShipService.acceptFriendRequest(friendId);
        return ApiResponse.<Friendship>builder()
                .success(true)
                .message("Friend request accepted")
                .data(friendship)
                .build();
    }

    @DeleteMapping("/{friendId}")
    public ApiResponse<Void> removeFriend(
            @PathVariable UUID friendId) {
        friendShipService.removeFriend( friendId);
        return ApiResponse.<Void>builder()
                .success(true)
                .message("Friend removed successfully")
                .build();
    }

    @GetMapping
    public ApiResponse<List<User>> getFriends(){
        List<User> friends = friendShipService.getFriends();
        return ApiResponse.<List<User>>builder()
                .success(true)
                .message("Friends retrieved successfully")
                .data(friends)
                .build();
    }

    @GetMapping("/pending")
    public ApiResponse<List<Friendship>> getPendingRequests(){
        List<Friendship> pendingRequests = friendShipService.getPendingRequests();
        return ApiResponse.<List<Friendship>>builder()
                .success(true)
                .message("Pending requests retrieved successfully")
                .data(pendingRequests)
                .build();
    }
}