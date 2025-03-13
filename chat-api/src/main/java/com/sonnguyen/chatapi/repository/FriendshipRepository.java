package com.sonnguyen.chatapi.repository;

import com.sonnguyen.chatapi.model.Friendship;
import com.sonnguyen.chatapi.model.User;
import com.sonnguyen.chatapi.model.enums.FriendshipStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface FriendshipRepository extends JpaRepository<Friendship, UUID> {
    List<Friendship> findByUserAndStatus(User user, FriendshipStatus status);
    List<Friendship> findByFriendAndStatus(User friend, FriendshipStatus status);
    boolean existsByUserAndFriend(User user, User friend);

    Optional<Object> findByUserAndFriendAndStatus(User user, User friend, FriendshipStatus status);
    @Query("SELECT f FROM Friendship f WHERE (f.user = :user AND f.friend = :friend) OR (f.user = :friend AND f.friend = :user)")
    List<Friendship> findByUserAndFriendOrFriendAndUser(@Param("user") User user, @Param("friend") User friend);

}
