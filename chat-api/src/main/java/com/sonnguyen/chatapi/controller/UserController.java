package com.sonnguyen.chatapi.controller;

import com.sonnguyen.chatapi.model.User;
import com.sonnguyen.chatapi.payload.request.UpdateProfileRequest;
import com.sonnguyen.chatapi.repository.UserRepository;
import com.sonnguyen.chatapi.service.UserService;
import com.sonnguyen.chatapi.utils.SecurityUtils;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;


@Slf4j
@RestController
@RequestMapping("/api/v1/users")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;
    private final UserRepository userRepository;

    @PreAuthorize("isAuthenticated()")
    @PutMapping("/profile")
    public ResponseEntity<?> updateProfile(@Valid @RequestBody UpdateProfileRequest request) {
        return ResponseEntity.ok(userService.updateProfile(request));
    }
    @GetMapping("/search")
    public ResponseEntity<?> searchUsers(@RequestParam String keyword) {
        List<User> users = userService.searchUsers(keyword);
        return ResponseEntity.ok(users);
    }

    @GetMapping
    public ResponseEntity<?> getAllUsers() {
        User user = SecurityUtils.getCurrentUser();
        List<User> allUsers = userRepository.findAll();
        log.info("getAllUsers: " + allUsers);
        log.info("userID: " + user.getId());
        List<User> filteredUsers = allUsers.stream()
                .filter(u -> !u.getId().equals(user.getId()))
                .collect(Collectors.toList());

        return ResponseEntity.ok(filteredUsers);
    }

    @GetMapping("/presence")
    public ResponseEntity<?> isUserOnline() {
        User user = SecurityUtils.getCurrentUser();
        boolean ok = userService.isUserOnline(user.getId());
        return ResponseEntity.ok(ok);
    }
}
