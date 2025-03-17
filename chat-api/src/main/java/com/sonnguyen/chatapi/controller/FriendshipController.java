package com.sonnguyen.chatapi.controller;

import com.sonnguyen.chatapi.model.User;
import com.sonnguyen.chatapi.model.friendship.Friendship;
import com.sonnguyen.chatapi.payload.response.ApiResponse;
import com.sonnguyen.chatapi.repository.FriendshipRepository;
import com.sonnguyen.chatapi.service.FriendshipService;
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
    private final FriendshipService friendshipService;
    private final FriendshipRepository friendshipRepository;

    @GetMapping("/suggestions")
    public ApiResponse<List<User>> getFriendSuggestions() {
        List<User> suggestions = friendshipService.getFriendSuggestions();
        return ApiResponse.<List<User>>builder()
                .success(true)
                .message("Friend suggestions retrieved successfully")
                .data(suggestions)
                .build();
    }


    @PostMapping("/request/{friendId}")
    public ApiResponse<Friendship> sendFriendRequest(
            @PathVariable UUID friendId) {
        log.info("friendID: " + friendId);
        Friendship friendship = friendshipService.sendFriendRequest(friendId);
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
        Friendship friendship = friendshipService.acceptFriendRequest(friendId);
        return ApiResponse.<Friendship>builder()
                .success(true)
                .message("Friend request accepted")
                .data(friendship)
                .build();
    }

    @DeleteMapping("/{friendId}")
    public ApiResponse<Void> removeFriend(
            @PathVariable UUID friendId) {
        friendshipService.removeFriend( friendId);
        return ApiResponse.<Void>builder()
                .success(true)
                .message("Friend removed successfully")
                .build();
    }

    @GetMapping
    public ApiResponse<List<User>> getFriends(){
        List<User> friends = friendshipService.getFriends();
        return ApiResponse.<List<User>>builder()
                .success(true)
                .message("Friends retrieved successfully")
                .data(friends)
                .build();
    }

    @GetMapping("/pending")
    public ApiResponse<List<User>> getPendingRequests(){
        List<User> pendingRequests = friendshipService.getPendingRequests();
        return ApiResponse.<List<User>>builder()
                .success(true)
                .message("Pending requests retrieved successfully")
                .data(pendingRequests)
                .build();
    }
}