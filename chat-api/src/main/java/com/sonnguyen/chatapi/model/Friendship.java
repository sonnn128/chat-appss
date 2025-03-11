package com.sonnguyen.chatapi.model;

import com.sonnguyen.chatapi.model.enums.FriendshipStatus;
import jakarta.persistence.*;
import lombok.*;

import java.util.UUID;

@Getter
@Setter
@Entity
@Table(name = "friendships")
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
public class Friendship {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne
    @JoinColumn(name = "friend_id", nullable = false)
    private User friend;

    @Enumerated(EnumType.STRING)
    private FriendshipStatus status;
}
