package com.sonnguyen.chatapi.repository;

import com.sonnguyen.chatapi.model.Channel;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ChannelRepository extends JpaRepository<Channel, Long> {
}