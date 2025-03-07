package com.sonnguyen.chatapi.payload.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RegisterRequest {
    @NotEmpty(message = "firstname can not empty")
    private String firstname;
    @NotEmpty(message = "lastname can not empty")
    private String lastname;
    @NotEmpty(message = "email can not empty")
    @Email(message = "invalid email")
    private String email;
    @NotEmpty(message = "password can not empty")
    private String password;
}
