package com.example.productservice.dto;

import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public record ProductRequest(
        Long userId,
        String name,
        Long category,
        List<MultipartFile> imagesPath,
        String description,
        Double price,
        Double rating
) {
}
