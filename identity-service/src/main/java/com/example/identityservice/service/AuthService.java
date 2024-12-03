package com.example.identityservice.service;

import com.example.identityservice.dto.AuthRequest;
import com.example.identityservice.dto.AuthResponse;
import com.example.identityservice.dto.RefreshTokenRequest;
import com.example.identityservice.entity.User;
import com.example.identityservice.repository.UserRepository;
import com.example.identityservice.utils.Pair;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final UserRepository userRepository;
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;
    private final RefreshTokenService refreshTokenService;

    public AuthResponse requestAccessToken(AuthRequest authRequest) {
        try {
            Authentication authObject = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(authRequest.username(), authRequest.password()));
            SecurityContextHolder.getContext().setAuthentication(authObject);
            String scope = authObject.getAuthorities().stream().map(GrantedAuthority::getAuthority)
                    .collect(Collectors.joining(" "));

            Optional<User> user = userRepository.findByUsername(authRequest.username());
            if (user.isEmpty())
                throw new RuntimeException("User not found");

            Pair<String, Instant> jwtAndExpiration = jwtService.generateToken(user.get().getId(), scope);

            return new AuthResponse(
                    authRequest.username(),
                    jwtAndExpiration.first,
                    jwtAndExpiration.second,
                    refreshTokenService.generateRefreshToken(user.get()).getToken()
            );
        } catch (BadCredentialsException e) {
            throw new BadCredentialsException("Incorrect email or password");
        }
    }

    public AuthResponse refreshAccessToken(RefreshTokenRequest refreshTokenRequest) {
        refreshTokenService.validateRefreshToken(refreshTokenRequest.username(), refreshTokenRequest.refreshToken());

        String email = refreshTokenRequest.username();
        Optional<User> user = userRepository.findByUsername(email);
        if (user.isEmpty())
            throw new IllegalStateException("Authenticated user not found");
        String scope = user.get().getAuthorities().stream().map(GrantedAuthority::getAuthority)
                .collect(Collectors.joining(" "));

        Pair<String, Instant> jwtAndExpiration = jwtService.generateToken(user.get().getId(), scope);
        return new AuthResponse(
                email,
                jwtAndExpiration.first,
                jwtAndExpiration.second,
                refreshTokenRequest.refreshToken()
        );
    }
}