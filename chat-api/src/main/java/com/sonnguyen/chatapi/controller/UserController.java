package com.sonnguyen.chatapi.controller;

import com.sonnguyen.chatapi.model.User;
import com.sonnguyen.chatapi.payload.request.UpdateProfileRequest;
import com.sonnguyen.chatapi.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@Slf4j
@RestController
@RequestMapping("/api/v1/users")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

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
}
