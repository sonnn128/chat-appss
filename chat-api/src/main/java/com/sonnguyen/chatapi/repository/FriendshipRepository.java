package com.sonnguyen.chatapi.repository;

import com.sonnguyen.chatapi.model.friendship.Friendship;
import com.sonnguyen.chatapi.model.User;
import com.sonnguyen.chatapi.model.friendship.FriendshipKey;
import com.sonnguyen.chatapi.model.friendship.FriendshipStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface FriendshipRepository extends JpaRepository<Friendship, FriendshipKey> {
    List<Friendship> findByUserIdAndStatus(UUID userId, FriendshipStatus status);
    Optional<Friendship> findByUserIdAndFriendId(UUID userId, UUID friendId);
    boolean existsByUserIdAndFriendId(UUID userId, UUID friendId);
    List<Friendship> findByFriendIdAndStatus(UUID friendId, FriendshipStatus status);
    @Query("SELECT f.user FROM Friendship f WHERE f.friend.id = :userId AND f.status = 'ACCEPTED' " +
            "UNION " +
            "SELECT f.friend FROM Friendship f WHERE f.user.id = :userId AND f.status = 'ACCEPTED'")
    List<User> findFriends(@Param("userId") UUID userId);
    List<Friendship> findByUserId(UUID userId);

    @Query("SELECT f FROM Friendship f WHERE f.friend.id = :userId AND f.status = 'PENDING'")
    List<Friendship> findPendingRequestsForUser(@Param("userId") UUID userId);

}