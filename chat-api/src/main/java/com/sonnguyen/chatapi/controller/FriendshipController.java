package com.sonnguyen.chatapi.controller;

import com.sonnguyen.chatapi.model.Friendship;
import com.sonnguyen.chatapi.model.User;
import com.sonnguyen.chatapi.payload.response.ApiResponse;
import com.sonnguyen.chatapi.service.FriendshipService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;
@Slf4j
@RestController
@RequestMapping("/api/v1/friendships")
@RequiredArgsConstructor
public class FriendshipController {
    private final FriendshipService friendshipService;

    @PostMapping("/request")
    public ResponseEntity<ApiResponse<String>> sendFriendRequest(@RequestParam UUID senderId, @RequestParam UUID receiverId) {
        String message = friendshipService.sendFriendRequest(senderId, receiverId);
        return ResponseEntity.ok(new ApiResponse<>(true, message, null));
    }

    @GetMapping("/requests")
    public ResponseEntity<ApiResponse<List<Friendship>>> getPendingRequests(@RequestParam UUID userId) {
        List<Friendship> pendingRequests = friendshipService.getPendingRequests(userId);
        return ResponseEntity.ok(new ApiResponse<>(true, "Danh sách lời mời kết bạn", pendingRequests));
    }

    @PostMapping("/accept")
    public ResponseEntity<ApiResponse<String>> acceptFriendRequest(@RequestParam UUID requestId) {
        String message = friendshipService.respondToFriendRequest(requestId, true);
        return ResponseEntity.ok(new ApiResponse<>(true, message, null));
    }

    @PostMapping("/reject")
    public ResponseEntity<ApiResponse<String>> rejectFriendRequest(@RequestParam UUID requestId) {
        String message = friendshipService.respondToFriendRequest(requestId, false);
        return ResponseEntity.ok(new ApiResponse<>(true, message, null));
    }

    @GetMapping("/list")
    public ResponseEntity<ApiResponse<List<User>>> getFriends(@RequestParam UUID userId) {
        log.info("getFriends method called: " + userId);
        List<User> friends = friendshipService.getFriends(userId);
        return ResponseEntity.ok(new ApiResponse<>(true, "Danh sách bạn bè", friends));
    }

    @DeleteMapping("/unfriend")
    public ResponseEntity<ApiResponse<String>> unfriend(@RequestParam UUID userId, @RequestParam UUID friendId) {
        String message = friendshipService.unfriend(userId, friendId);
        return ResponseEntity.ok(new ApiResponse<>(true, message, null));
    }
}
