package com.sonnguyen.chat_server.model;

import lombok.*;
import org.springframework.data.cassandra.core.mapping.PrimaryKey;
import org.springframework.data.cassandra.core.mapping.Table;

import java.util.Date;
import java.util.UUID;

@ToString
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table("friend_messages")
public class FriendMessage {

    @PrimaryKey
    private UUID messageId;

    private UUID messageFrom;
    private UUID messageTo;
    private String content;
    private Date createdAt;
}
