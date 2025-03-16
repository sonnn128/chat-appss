package com.sonnguyen.chatapi.model.friendship;

import com.sonnguyen.chatapi.model.User;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@Entity
@Table(name = "friendships")
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
public class Friendship {
    @EmbeddedId
    private FriendshipKey id;

    @ManyToOne
    @MapsId("userId")
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @MapsId("friendId")
    @JoinColumn(name = "friend_id")
    private User friend;

    @Enumerated(EnumType.STRING)
    private FriendshipStatus status;

    private LocalDateTime createdAt = LocalDateTime.now();
}