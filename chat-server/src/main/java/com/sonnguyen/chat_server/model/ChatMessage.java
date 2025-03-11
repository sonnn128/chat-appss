package com.sonnguyen.chat_server.model;

import com.sonnguyen.chat_server.model.enums.MessageType;
import lombok.*;
import org.springframework.data.cassandra.core.mapping.PrimaryKey;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ChatMessage {
    private MessageType type;
    private String content;
    private String sender;
}
