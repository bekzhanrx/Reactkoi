package com.example.productservice.service;

import com.example.productservice.dto.ProductRequest;
import com.example.productservice.dto.ProductResponse;
import com.example.productservice.entity.Product;
import com.example.productservice.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
public class ProductService {
    private final ProductRepository productRepository;
    public List<ProductResponse> getAllProducts(){
        return productRepository.findAll().stream()
                .map(this::mapToResponse)
                .toList();
    }
    public ProductResponse getProduct(Long id){
        return mapToResponse(productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found")));
    }
    public ProductResponse save(ProductRequest request){
        return mapToResponse(productRepository.save(mapToProduct(request)));
    }
    public void delete(Long id){
        productRepository.deleteById(id);
    }
    public ProductResponse update(Long id, ProductRequest request) throws IOException {
        Product product = mapToProduct(request);
        product.setId(id);
        return mapToResponse(productRepository.save(product));
    }
    private ProductResponse mapToResponse(Product product){
        return new ProductResponse(
                product.getUserId(),
                product.getId(),
                product.getName(),
                product.getCategory(),
                product.getImagesPath(),
                product.getDescription(),
                product.getPrice(),
                product.getRating()
        );
    }
    private Product mapToProduct(ProductRequest request){
        List<String> imagesPath = new ArrayList<>();
        for(MultipartFile file : request.imagesPath()){
            String fileName = file.getOriginalFilename();

            // Add the file path to the list (as a String)
            imagesPath.add(fileName);
        }
        return Product.builder()
                .id(request.userId())
                .name(request.name())
                .category(request.category())
                .imagesPath(imagesPath)
                .description(request.description())
                .price(request.price())
                .rating(request.rating())
                .build();
    }
}
