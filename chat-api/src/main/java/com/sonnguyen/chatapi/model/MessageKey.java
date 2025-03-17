package com.sonnguyen.chatapi.model;

import lombok.*;

import java.util.UUID;

@ToString
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
public class MessageKey {
    private UUID channelId;
    private UUID messageId;
}

