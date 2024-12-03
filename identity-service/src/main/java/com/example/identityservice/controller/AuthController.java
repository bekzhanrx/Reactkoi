package com.example.identityservice.controller;

import com.example.identityservice.dto.AuthRequest;
import com.example.identityservice.dto.AuthResponse;
import com.example.identityservice.dto.RefreshTokenRequest;
import com.example.identityservice.service.AuthService;
import com.example.identityservice.service.RefreshTokenService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/auth")
public class AuthController {
    private final AuthService authService;
    private final RefreshTokenService refreshTokenService;
    @PostMapping("/auth_token")
    public AuthResponse requestAccessToken(@RequestBody AuthRequest authRequest) {
        return authService.requestAccessToken(authRequest);
    }
    @PostMapping("/refresh_token")
    public AuthResponse refreshToken(@RequestBody RefreshTokenRequest refreshTokenRequest) {
        return authService.refreshAccessToken(refreshTokenRequest);
    }
    @GetMapping("/logout/{email}")
    public ResponseEntity<String> logout(@PathVariable String email) {
        refreshTokenService.deleteRefreshTokensByUser(email);
        return new ResponseEntity<>("You will be signed out shortly", HttpStatus.ACCEPTED);
    }
}
