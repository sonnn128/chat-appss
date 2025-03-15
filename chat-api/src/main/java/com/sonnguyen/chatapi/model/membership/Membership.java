package com.sonnguyen.chatapi.model.membership;

import com.sonnguyen.chatapi.model.*;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "membership")
public class Membership {
    @EmbeddedId
    private MembershipKey id;

    @ManyToOne
    @MapsId("channelId")
    @JoinColumn(name = "channel_id")
    Channel channel;

    @ManyToOne
    @MapsId("userId")
    @JoinColumn(name = "user_id")
    User user;

    @Enumerated(EnumType.STRING)
    private Status status;
    @Enumerated(EnumType.STRING)
    private Role role;
    private LocalDateTime joiningDate;
}

