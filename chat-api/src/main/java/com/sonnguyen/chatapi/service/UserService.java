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
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.UUID;

@Slf4j
@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final RestTemplate restTemplate = new RestTemplate();

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


    public boolean isUserOnline(UUID userId) {
        String url = "http://localhost:8082/api/v1/presence/is-online/" + userId;
        return Boolean.TRUE.equals(restTemplate.getForObject(url, Boolean.class));
    }

}
