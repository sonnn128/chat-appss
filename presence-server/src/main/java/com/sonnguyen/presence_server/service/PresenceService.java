package com.sonnguyen.presence_server.service;

import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import java.util.Set;

@Service
public class PresenceService {
    private static final String ONLINE_USERS_KEY = "online_users";
    private final RedisTemplate<String, String> redisTemplate;

    public PresenceService(RedisTemplate<String, String> redisTemplate) {
        this.redisTemplate = redisTemplate;
    }

    public void setUserOnline(String userId) {
        redisTemplate.opsForSet().add(ONLINE_USERS_KEY, userId);
    }

    public void setUserOffline(String userId) {
        redisTemplate.opsForSet().remove(ONLINE_USERS_KEY, userId);
    }

    public boolean isUserOnline(String userId) {
        return Boolean.TRUE.equals(redisTemplate.opsForSet().isMember(ONLINE_USERS_KEY, userId));
    }

    public Set<String> getOnlineUsers() {
        return redisTemplate.opsForSet().members(ONLINE_USERS_KEY);
    }
}

