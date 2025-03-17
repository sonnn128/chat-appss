package com.sonnguyen.chatapi.service;

import com.sonnguyen.chatapi.model.User;
import com.sonnguyen.chatapi.payload.request.UpdateProfileRequest;
import com.sonnguyen.chatapi.payload.response.UserResponse;
import com.sonnguyen.chatapi.repository.UserRepository;
import com.sonnguyen.chatapi.utils.SecurityUtils;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserResponse updateProfile(UpdateProfileRequest request) {
        User user = SecurityUtils.getCurrentUser();

        user.setFirstname(request.getFirstname());
        user.setLastname(request.getLastname());

        userRepository.save(user);
        return UserResponse.fromEntity(user);
    }
    public List<User> searchUsers(String keyword) {
        return userRepository.searchUsers(keyword);
    }
}
