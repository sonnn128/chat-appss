package com.sonnguyen.chatapi.config;

import com.sonnguyen.chatapi.model.Role;
import com.sonnguyen.chatapi.repository.RoleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.Set;

@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {
    private final RoleRepository roleRepository;

    @Override
    public void run(String... args) {
        Set.of("ADMIN", "USER").forEach(roleName -> {
            roleRepository.findByName(roleName).orElseGet(() -> {
                Role role = new Role();
                role.setName(roleName);
                role.setDescription("Role " + roleName);
                return roleRepository.save(role);
            });
        });
    }
}
