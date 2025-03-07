package com.sonnguyen.chatapi.payload.response;

import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Builder
@AllArgsConstructor
@Data
@JsonPropertyOrder({
        "success",
        "message"
})
public class ApiResponse<T> {
    private boolean success;
    private String message;
    private T data;
    public ApiResponse(Boolean success, String message) {
        this.success = success;
        this.message = message;
    }
}