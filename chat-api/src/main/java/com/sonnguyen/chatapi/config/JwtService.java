package com.sonnguyen.chatapi.config;

import com.sonnguyen.chatapi.model.User;
import com.sonnguyen.chatapi.repository.UserRepository;
import io.jsonwebtoken.*;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Service;

import java.nio.charset.StandardCharsets;
import java.util.Date;
import java.util.stream.Collectors;

import io.jsonwebtoken.security.Keys;
import javax.crypto.SecretKey;

@Service
@Slf4j
@RequiredArgsConstructor
public class JwtService {
    @Value("${jwt.SECRET_KEY}")
    private String secretKey;

    @Value("${jwt.expirationMs}")
    private long expirationTime;

    private final UserRepository userRepository;
    private SecretKey secretKeyBytes;

    @PostConstruct
    public void init() {
        this.secretKeyBytes = Keys.hmacShaKeyFor(secretKey.getBytes(StandardCharsets.UTF_8));
    }

    public String generateToken(User user) {
        String authorities = user.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.joining(","));

        return Jwts.builder()
                .setSubject(user.getUsername())
                .claim("authorities", authorities)
                .setIssuer("sonnguyen.com")
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + expirationTime))
                .signWith(secretKeyBytes, SignatureAlgorithm.HS512)
                .compact();
    }

    public boolean validateToken(String token) {
        try {
            Claims claims = extractClaims(token);
            return !claims.getExpiration().before(new Date());
        } catch (ExpiredJwtException e) {
            log.warn("Token đã hết hạn: {}", e.getMessage());
        } catch (JwtException e) {
            log.error("Token không hợp lệ: {}", e.getMessage());
        }
        return false;
    }

    public String extractUsername(String token) {
        return extractClaims(token).getSubject();
    }

    private Claims extractClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(secretKeyBytes)
                .build()
                .parseClaimsJws(token)
                .getBody();
    }
}
