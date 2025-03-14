package com.sonnguyen.chatapi.model;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.*;

import java.io.Serializable;
import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
@Embeddable
public class MembershipKey implements Serializable {
    @Column(name = "channel_id")
    private UUID channelId;

    @Column(name = "user_id")
    private UUID userId;
}

