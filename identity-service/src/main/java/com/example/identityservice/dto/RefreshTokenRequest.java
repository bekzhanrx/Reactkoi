package com.example.identityservice.dto;

public record RefreshTokenRequest(
        String username,
        String refreshToken
) {
}
