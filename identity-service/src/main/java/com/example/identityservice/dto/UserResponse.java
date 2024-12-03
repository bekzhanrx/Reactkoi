package com.example.identityservice.dto;

import java.time.Instant;

public record UserResponse(
        Long id,
        String username,
        String email,
        String bio,
        String role,
        Instant created,
        boolean active
) {

}
