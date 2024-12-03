package com.example.identityservice.dto;

public record UserRequest (
        String username,
        String email,
        String password,
        String bio,
        String role
){
}
