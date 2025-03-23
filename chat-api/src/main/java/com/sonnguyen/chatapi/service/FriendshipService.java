package com.sonnguyen.chatapi.service;

import com.sonnguyen.chatapi.model.User;
import com.sonnguyen.chatapi.model.friendship.Friendship;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public interface FriendshipService {
    Friendship sendFriendRequest(UUID friendId);

    Friendship acceptFriendRequest(UUID friendId);

    void removeFriend(UUID friendId);

    List<User> getFriends();

    List<User> getPendingRequests();
    List<User> getFriendSuggestions();


}
