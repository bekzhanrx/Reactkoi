package com.example.productservice.dto;

import java.util.List;

public record ProductResponse(
        Long userId,
        Long id,
        String name,
        Long category,
        List<String> imagesPath,
        String description,
        Double price,
        Double rating
) {
}
