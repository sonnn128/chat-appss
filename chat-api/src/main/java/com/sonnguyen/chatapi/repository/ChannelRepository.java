package com.sonnguyen.chatapi.repository;

import com.sonnguyen.chatapi.model.Channel;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface ChannelRepository extends JpaRepository<Channel, UUID> {
}