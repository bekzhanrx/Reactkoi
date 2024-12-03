package com.example.identityservice.service;

import com.example.identityservice.dto.AuthRequest;
import com.example.identityservice.dto.UserRequest;
import com.example.identityservice.dto.UserResponse;
import com.example.identityservice.entity.Role;
import com.example.identityservice.entity.User;
import com.example.identityservice.repository.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.Optional;

@Slf4j
@Service
@Transactional
public class UserService implements UserDetailsService {
    private final UserRepository userRepository;
    private final RefreshTokenService refreshTokenService;
    private final AuthenticationManager authenticationManager;
    private final PasswordEncoder passwordEncoder;
    @Autowired
    @Lazy
    UserService(UserRepository userRepository, RefreshTokenService refreshTokenService, AuthenticationManager authenticationManager, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.refreshTokenService = refreshTokenService;
        this.authenticationManager = authenticationManager;
        this.passwordEncoder = passwordEncoder;
    }


    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return userRepository.findByUsername(username)
                .orElseThrow(() ->
                        new UsernameNotFoundException(String.format("User with username %s not found", username)));
    }
    public UserResponse mapUserToResponse(User user) {
        return new UserResponse(
                user.getId(),
                user.getUsername(),
                user.getEmail(),
                user.getBio(),
                user.getRole().name(),
                user.getCreated(),
                user.isActive()
        );
    }

    public ResponseEntity<UserResponse> createUser(UserRequest userRequest) {
        if (Role.valueOf(userRequest.role()) == Role.ADMIN)
            throw new RuntimeException("Cannot manually create admin user.");
        if(userRepository.existsByUsername(userRequest.username())){
            throw new IllegalArgumentException("User already exists.");
        }
        User user = userRepository.save(
                User.builder()
                        .username(userRequest.username())
                        .email(userRequest.email())
                        .password(passwordEncoder.encode(userRequest.password()))
                        .bio(userRequest.bio())
                        .role(Role.valueOf(userRequest.role()))
                        .created(Instant.now())
                        .active(true)
                        .build()
        );

        return new ResponseEntity<>(mapUserToResponse(user), HttpStatus.CREATED);
    }

    public UserResponse getUser(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return mapUserToResponse(user);
    }

    public ResponseEntity<String> deactivateUser(AuthRequest authRequest) {
        // The idea is that the user has to reenter their password to deactivate their account hence no use of tokens
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(authRequest.username(), authRequest.password()));

            Optional<User> userOptional = userRepository.findByUsername(authRequest.username());
            if(userOptional.isEmpty())
                return new ResponseEntity<>("User not found", HttpStatus.NOT_FOUND);

            User user = userOptional.get();
            user.setActive(false);
            userRepository.save(user);
            refreshTokenService.deleteRefreshTokensByUser(user.getEmail());
            return new ResponseEntity<>("Account deactivated", HttpStatus.NO_CONTENT);
        } catch (AuthenticationException e) {
            return new ResponseEntity<>("Incorrect username or password", HttpStatus.UNAUTHORIZED);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
