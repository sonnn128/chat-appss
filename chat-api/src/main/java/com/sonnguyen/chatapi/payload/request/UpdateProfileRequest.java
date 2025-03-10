package com.sonnguyen.chatapi.payload.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class UpdateProfileRequest {
    @NotBlank(message = "Họ không được để trống")
    private String firstname;

    @NotBlank(message = "Tên không được để trống")
    private String lastname;

}
