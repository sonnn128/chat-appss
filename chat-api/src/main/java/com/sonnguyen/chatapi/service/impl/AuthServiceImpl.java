package com.sonnguyen.chatapi.service.impl;

import com.sonnguyen.chatapi.config.JwtService;
import com.sonnguyen.chatapi.exception.CommonException;
import com.sonnguyen.chatapi.model.Role;
import com.sonnguyen.chatapi.model.User;
import com.sonnguyen.chatapi.payload.request.LoginRequest;
import com.sonnguyen.chatapi.payload.request.RegisterRequest;
import com.sonnguyen.chatapi.payload.response.AuthResponse;
import com.sonnguyen.chatapi.repository.RoleRepository;
import com.sonnguyen.chatapi.repository.UserRepository;
import com.sonnguyen.chatapi.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {
    private final int JWT_EXPIRATION_TIME = 1000 * 60 * 60 * 24; // 1 day
    private final int JWT_EXPIRATION_TIME_REMEMBER_ME = 1000 * 60 * 60 * 24 * 3; // 3 days
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final UserDetailsService userDetailsService;
    private final AuthenticationManager authenticationManager;
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;

    public AuthResponse login(LoginRequest loginRequest) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getEmail(),
                        loginRequest.getPassword())
        );

        var user = userRepository.findByEmail(loginRequest.getEmail())
                .orElseThrow(() -> new CommonException("User not found", HttpStatus.NOT_FOUND));

        int timeToLive = loginRequest.isRememberMe() ? JWT_EXPIRATION_TIME_REMEMBER_ME : JWT_EXPIRATION_TIME;
        String token = jwtService.generateToken(user, timeToLive);

        return AuthResponse.builder()
                .id(user.getId())
                .firstname(user.getFirstname())
                .lastname(user.getLastname())
                .email(user.getEmail())
                .username(user.getUsername())
                .roles(user.getRoles().stream()
                        .map(Role::getName)
                        .collect(Collectors.toSet()))
                .token(token)
                .build();
    }

    public AuthResponse register(RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new CommonException("Email already exists", HttpStatus.BAD_REQUEST);
        }

        var userRole = roleRepository.findByName("USER")
                .orElseThrow(() -> new CommonException("Role USER not found", HttpStatus.BAD_REQUEST));

        var user = User.builder()
                .firstname(request.getFirstname())
                .lastname(request.getLastname())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .roles(Set.of(userRole))
                .build();

        userRepository.save(user);

        var jwtToken = jwtService.generateToken(user, JWT_EXPIRATION_TIME);

        return AuthResponse.builder()
                .id(user.getId())
                .firstname(user.getFirstname())
                .lastname(user.getLastname())
                .email(user.getEmail())
                .roles(user.getRoles().stream()
                        .map(Role::getName)
                        .collect(Collectors.toSet()))
                .token(jwtToken)
                .build();
    }

    @Override
    public AuthResponse authenticate() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication == null || !authentication.isAuthenticated() || !(authentication.getPrincipal() instanceof User)) {
            throw new CommonException("User not authenticated", HttpStatus.UNAUTHORIZED);
        }

        User user = (User) authentication.getPrincipal();
        String jwt = jwtService.generateToken(user, JWT_EXPIRATION_TIME);

        return AuthResponse.builder()
                .id(user.getId())
                .email(user.getEmail())
                .username(user.getUsername())
                .firstname(user.getFirstname())
                .lastname(user.getLastname())
                .roles(user.getRoles().stream()
                        .map(Role::getName)
                        .collect(Collectors.toSet()))
                .token(jwt)
                .build();
    }
}
