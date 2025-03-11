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
    public ResponseEntity<?> sendFriendRequest(@RequestParam UUID senderId, @RequestParam UUID receiverId) {
        return ResponseEntity.ok(friendshipService.sendFriendRequest(senderId, receiverId));
    }

    @GetMapping("/requests")
    public ResponseEntity<?> getPendingRequests(@RequestParam UUID userId) {
        return ResponseEntity.ok(friendshipService.getPendingRequests(userId));
    }

    @PostMapping("/accept")
    public ResponseEntity<?> acceptFriendRequest(@RequestParam UUID requestId) {
        return ResponseEntity.ok(friendshipService.respondToFriendRequest(requestId, true));
    }

    @PostMapping("/reject")
    public ResponseEntity<?> rejectFriendRequest(@RequestParam UUID requestId) {
        return ResponseEntity.ok(friendshipService.respondToFriendRequest(requestId, false));
    }

    @GetMapping("/list")
    public ResponseEntity<?> getFriends(@RequestParam UUID userId) {
        return ResponseEntity.ok(friendshipService.getFriends(userId));
    }

    @DeleteMapping("/unfriend")
    public ResponseEntity<?> unfriend(@RequestParam UUID userId, @RequestParam UUID friendId) {
        return ResponseEntity.ok(friendshipService.unfriend(userId, friendId));
    }
}
