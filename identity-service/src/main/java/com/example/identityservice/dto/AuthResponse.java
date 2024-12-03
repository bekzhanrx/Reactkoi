package com.example.identityservice.dto;

import java.time.Instant;

public record AuthResponse (
        String username,
        String accessToken,
        Instant expiresAt,
        String refreshToken
){
}
