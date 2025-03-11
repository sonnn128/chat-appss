package com.sonnguyen.chat_server.repository;

import com.sonnguyen.chat_server.model.ChatMessage;
import org.springframework.data.cassandra.repository.CassandraRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MessageRepository extends CassandraRepository<ChatMessage, Long> {
}