package com.sonnguyen.chatapi.payload.response;

import com.sonnguyen.chatapi.model.Role;
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
    private Role role;
    private String token;
}
