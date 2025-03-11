package com.sonnguyen.chatapi.utils;

import com.sonnguyen.chatapi.model.User;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

public class SecurityUtils {
    public static User getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !(authentication.getPrincipal() instanceof UserDetails)) {
            throw new UsernameNotFoundException("User not authenticated");
        }
        return (User) authentication.getPrincipal();
    }
}
