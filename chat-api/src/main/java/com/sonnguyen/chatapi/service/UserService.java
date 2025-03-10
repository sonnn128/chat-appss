package com.sonnguyen.chatapi.service;

import com.sonnguyen.chatapi.model.User;
import com.sonnguyen.chatapi.payload.request.UpdateProfileRequest;
import com.sonnguyen.chatapi.payload.response.UserResponse;
import com.sonnguyen.chatapi.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;

    @Transactional
    public UserResponse updateProfile(String username, UpdateProfileRequest request) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        user.setFirstname(request.getFirstname());
        user.setLastname(request.getLastname());
        user.setEmail(request.getEmail());

        userRepository.save(user);

        return UserResponse.fromEntity(user);
    }

}
