package com.sonnguyen.chatapi.payload.request;

import java.util.UUID;

public class CreateChannelRequest {
    private String name;
    private UUID ownerId;

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public UUID getOwnerId() { return ownerId; }
    public void setOwnerId(UUID ownerId) { this.ownerId = ownerId; }
}