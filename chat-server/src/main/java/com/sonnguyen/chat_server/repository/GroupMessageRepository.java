package com.sonnguyen.chat_server.repository;

import com.sonnguyen.chat_server.model.ChannelMessage;
import com.sonnguyen.chat_server.model.ChannelMessageKey;
import org.springframework.data.cassandra.repository.CassandraRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GroupMessageRepository extends CassandraRepository<ChannelMessage, ChannelMessageKey> {
    List<ChannelMessage> findByKeyChannelId(Long channelId);
}