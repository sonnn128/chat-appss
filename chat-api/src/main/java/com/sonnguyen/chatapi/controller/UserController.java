package com.sonnguyen.chatapi.controller;

import com.sonnguyen.chatapi.payload.request.UpdateProfileRequest;
import com.sonnguyen.chatapi.payload.response.UserResponse;
import com.sonnguyen.chatapi.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;


@RestController
@RequestMapping("/api/v1/user")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

//    @PreAuthorize("isAuthenticated()")
    @PutMapping("/profile")
    public ResponseEntity<?> updateProfile(@Valid @RequestBody UpdateProfileRequest request, Principal principal) {
        if (principal == null || principal.getName() == null) {
            return ResponseEntity.status(401).body("Unauthorized: User not authenticated");
        }

        try {
            UserResponse updatedUser = userService.updateProfile(principal.getName(), request);
            return ResponseEntity.ok(updatedUser);
        } catch (Exception e) {
            return ResponseEntity.status(400).body("Failed to update profile: " + e.getMessage());
        }
    }
}
