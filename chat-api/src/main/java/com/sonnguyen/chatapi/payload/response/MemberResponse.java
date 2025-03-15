package com.sonnguyen.chatapi.payload.response;

import com.sonnguyen.chatapi.model.membership.Role;
import com.sonnguyen.chatapi.model.membership.Status;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class MemberResponse {
    private UUID id;
    private String email;
    private String username;
    private String firstname;
    private String lastname;
    private Role role;
    private Status status;
    private LocalDateTime joiningDate;
}
