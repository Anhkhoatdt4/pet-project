package com.petprojectbe.petproject.controller;

import com.petprojectbe.petproject.dto.ApiResponse;
import com.petprojectbe.petproject.dto.request.ProductDto;
import com.petprojectbe.petproject.entity.Product;
import com.petprojectbe.petproject.service.ProductService;
import io.micrometer.common.util.StringUtils;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/product")
@FieldDefaults(level = AccessLevel.PRIVATE , makeFinal = true)
@RequiredArgsConstructor
@CrossOrigin
public class ProductController {
    ProductService productService;

    @PostMapping
    public ResponseEntity<Product>createProduct(@RequestBody ProductDto productDto) {
        Product product = productService.addProduct(productDto);
        return new ResponseEntity<>(product, HttpStatus.CREATED);
    }

    @GetMapping
    public ApiResponse<List<ProductDto>> getAllProducts(@RequestParam(required = false,name = "categoryId",value = "categoryId") UUID categoryId,
                                                        @RequestParam(required = false,name = "typeId",value = "typeId") UUID typeId,
                                                     @RequestParam(required = false, name = "slug") String slug) {
        List<ProductDto> productList = new ArrayList<>();
        if(StringUtils.isNotBlank(slug)){
            ProductDto productDto = productService.getProductBySlug(slug);
            productList.add(productDto);
        }
        else {
            productList = productService.getAllProducts(categoryId, typeId);
        }
        return ApiResponse.<List<ProductDto>>builder()
                .result(productList)
                .build();
    }

    @GetMapping("/{id}")
    public ApiResponse<ProductDto> getProductById(@PathVariable UUID id) {
        ProductDto productDto = productService.getProductById(id);
        return ApiResponse.<ProductDto>builder().result(productDto).build();
    }

    @PutMapping
    public ApiResponse<Product> updateProduct(@RequestBody ProductDto productDto) {
        Product product = productService.updateProduct(productDto);
        return ApiResponse.<Product>builder().result(product).build();
    }

    @DeleteMapping("/{id}")
    public ApiResponse deleteProduct(@PathVariable UUID id) {
        return ApiResponse.<String>builder().result(productService.deleteProduct(id)).build();
    }
}
