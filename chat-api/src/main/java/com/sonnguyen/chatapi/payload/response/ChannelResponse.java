package com.sonnguyen.chatapi.payload.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ChannelResponse {
    private UUID id;
    private String name;
    private List<MemberResponse> members;
    private List<MessageResponse> messages;
    private LocalDateTime dateCreated;
}

