package com.sonnguyen.chat_server.repository;

import com.sonnguyen.chat_server.model.ChannelMessage;
import com.sonnguyen.chat_server.model.ChannelMessageKey;
import org.springframework.data.cassandra.repository.CassandraRepository;

import java.util.List;
import java.util.UUID;

public interface ChannelMessageRepository extends CassandraRepository<ChannelMessage, ChannelMessageKey> {
    List<ChannelMessage> findAllByKeyChannelIdOrderByKeyMessageIdAsc(UUID channelId);
}
