package com.petprojectbe.petproject.controller;

import com.petprojectbe.petproject.dto.request.ApiResponse;
import com.petprojectbe.petproject.dto.request.ProductDto;
import com.petprojectbe.petproject.entity.Product;
import com.petprojectbe.petproject.service.ProductService;
import io.micrometer.common.util.StringUtils;
import jakarta.servlet.http.HttpServletResponse;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
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
    public ResponseEntity<List<ProductDto>> getAllProducts(@RequestParam(required = false,name = "categoryId",value = "categoryId") UUID categoryId,
                                                        @RequestParam(required = false,name = "typeId",value = "typeId") UUID typeId,
                                                        @RequestParam(required = false, name = "slug") String slug,
                                                        HttpServletResponse response, Pageable pageable) {
        List<ProductDto> productList = new ArrayList<>();
        if(StringUtils.isNotBlank(slug)){
            ProductDto productDto = productService.getProductBySlug(slug);
            productList.add(productDto);

        }
        else {
            productList = productService.getAllProducts(categoryId, typeId);
        }
        response.setHeader("Content-Range", String.valueOf(productList.size()));
        return ResponseEntity.<List<ProductDto>>ok()
                .header("X-Total-Count", String.valueOf(productList.size()))
                .body(productList);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProductDto> getProductById(@PathVariable UUID id) {
        ProductDto productDto = productService.getProductById(id);
        return new ResponseEntity<>(productDto, HttpStatus.OK);
    }

    @PutMapping
    public ResponseEntity<Product> updateProduct(@RequestBody ProductDto productDto) {
        Product product = productService.updateProduct(productDto);
        return new ResponseEntity<>(product,HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity deleteProduct(@PathVariable UUID id) {
        return new ResponseEntity(productService.deleteProduct(id), HttpStatus.OK);
    }

}
