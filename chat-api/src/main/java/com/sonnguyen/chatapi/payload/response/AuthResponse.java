package com.sonnguyen.chatapi.payload.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;
import java.util.UUID;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AuthResponse {
    private UUID id;
    private String firstname;
    private String lastname;
    private String email;
    private String username;
    private Set<String> roles; // Danh sách roles thay vì chỉ 1 role
    private String token;
}
