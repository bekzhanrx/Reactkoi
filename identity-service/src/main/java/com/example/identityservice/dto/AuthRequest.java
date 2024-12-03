package com.example.identityservice.dto;

public record AuthRequest (
        String username,
        String password
){
}
