package com.sonnguyen.chatapi.repository;

import com.sonnguyen.chatapi.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface UserRepository extends JpaRepository<User, UUID> {
    boolean existsByEmail(String email);
    Optional<User> findByEmail(String email);

    @Query("SELECT u FROM User u WHERE LOWER(u.email) LIKE LOWER(CONCAT('%', :keyword, '%')) " +
            "OR LOWER(u.email) LIKE LOWER(CONCAT('%', :keyword, '%')) " +
            "OR LOWER(u.firstname) LIKE LOWER(CONCAT('%', :keyword, '%')) " +
            "OR LOWER(u.lastname) LIKE LOWER(CONCAT('%', :keyword, '%'))")
    List<User> searchUsers(String keyword);

    @Query("""
                SELECT u FROM User u 
                WHERE u.id <> :userId 
                AND u.id NOT IN (
                    SELECT f.friend.id FROM Friendship f WHERE f.user.id = :userId
                    UNION 
                    SELECT f.user.id FROM Friendship f WHERE f.friend.id = :userId
                )
            """)
    List<User> findSuggestedFriends(@Param("userId") UUID userId);

}
