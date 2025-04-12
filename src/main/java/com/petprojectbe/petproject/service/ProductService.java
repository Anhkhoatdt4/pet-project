package com.petprojectbe.petproject.service;

import com.petprojectbe.petproject.dto.ProductDto;
import com.petprojectbe.petproject.entity.Product;

import java.util.List;
import java.util.UUID;

public interface ProductService {
    public Product addProduct(ProductDto product);
    public List<ProductDto> getAllProducts(UUID categoryId , UUID typeId);
    ProductDto getProductBySlug(String slug);
    ProductDto getProductById(UUID id);
    Product updateProduct(ProductDto productDto);
    String deleteProduct(UUID id);
}
