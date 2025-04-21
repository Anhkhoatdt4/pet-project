package com.petprojectbe.petproject.service;

import com.petprojectbe.petproject.dto.request.ProductDto;
import com.petprojectbe.petproject.dto.ProductResourceDto;
import com.petprojectbe.petproject.dto.ProductVariantDto;
import com.petprojectbe.petproject.entity.*;
import com.petprojectbe.petproject.exception.CategoryNotFoundException;
import com.petprojectbe.petproject.exception.ProductNotFoundException;
import com.petprojectbe.petproject.mapper.ProductMapper;
import com.petprojectbe.petproject.repository.ProductRepository;
import com.petprojectbe.petproject.specification.ProductSpecification;
import lombok.AccessLevel;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@Data
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
@Slf4j
public class ProductServiceImpl implements ProductService {

    ProductRepository productRepository;
    ProductMapper productMapper;
    CategoryService categoryService;
    @Override
    public Product addProduct(ProductDto productDto) {
        Product product = new Product();
        applyDtoToProduct(productDto, product);
        Product savedProduct = productRepository.save(product);
        return savedProduct;
    }

    @Override
    public List<ProductDto> getAllProducts(UUID categoryId, UUID typeId) {
        Specification<Product> productSpecification = Specification.where(null);
        if (categoryId != null) {
            productSpecification = productSpecification.and(ProductSpecification.hasCategoryId(categoryId));
        }
        if (typeId != null) {
            productSpecification = productSpecification.and(ProductSpecification.hasTypeId(typeId));
        }
        List<Product> products = productRepository.findAll(productSpecification);
        return products.stream().map(productMapper::toProductDto).collect(Collectors.toList());
    }

    @Override
    public ProductDto getProductBySlug(String slug) {
        Product product = productRepository.findBySlug(slug);
        if (product == null) {
            throw new ProductNotFoundException("Product with slug " + slug + " not found");
        }
        ProductDto productDto = productMapper.toProductDto(product);
        productDto.setCategoryId(product.getCategory().getId());
        productDto.setCategoryTypeId(product.getCategoryType().getId());
        productDto.setVariants(getProductVariants(product.getProductVariants()));
        productDto.setProductResources(getProductResources(product.getResources()));
        System.out.println("Product mapped: " + productDto);
        return productDto;
    }

    @Override
    public ProductDto getProductById(UUID id) {
        Product product = productRepository.findById(id).orElseThrow(() -> new ProductNotFoundException("Product with id " + id + " not found"));
        ProductDto productDto = productMapper.toProductDto(product);
        productDto.setCategoryId(product.getCategory().getId());
        productDto.setCategoryTypeId(product.getCategoryType().getId());
        productDto.setVariants(getProductVariants(product.getProductVariants()));
        productDto.setProductResources(getProductResources(product.getResources()));
        return productDto;
    }

    @Override
    public Product updateProduct(ProductDto productDto) {
        Product product = productRepository.findById(productDto.getId())
                .orElseThrow(() -> new ProductNotFoundException("Product not found"));
        Product updatedProduct = applyDtoToProduct(productDto, product);
        if (productDto.getThumbnail() != null){
            List<Resources> resources = product.getResources();
            Optional<Resources> thumbnailOpt = resources.stream()
                    .filter(Resources::getIsPrimary)
                    .findFirst();
            if (thumbnailOpt.isPresent()) {
                Resources thumbnail = thumbnailOpt.get();
                thumbnail.setUrl(productDto.getThumbnail());
            }
            else {
                Resources newThumbnail = Resources.builder()
                        .name("thumbnail")
                        .url(productDto.getThumbnail())
                        .type("image")
                        .isPrimary(true)
                        .product(product)
                        .build();
                resources.add(newThumbnail);
            }
        }
        return productRepository.save(updatedProduct);
    }

    private List<Resources> mapToProductResources(List<ProductResourceDto> dtos, Product product) {
        return dtos.stream().map(dto -> {
            Resources res = productMapper.toResources(dto);
            res.setProduct(product);
            return res;
        }).collect(Collectors.toList());
    }

    private List<ProductVariant> mapToProductVariants(List<ProductVariantDto> dtos, Product product) {
        return dtos.stream().map(dto -> {
            ProductVariant variant = productMapper.toProductVariant(dto);
            variant.setProduct(product);
            return variant;
        }).collect(Collectors.toList());
    }

    public List<ProductVariantDto> getProductVariants(List<ProductVariant> productVariants) {
        return productMapper.mapProductVariantListToDto(productVariants);
    }

    public List<ProductResourceDto> getProductResources(List<Resources> resources) {
        return productMapper.mapProductResourcesListDto(resources);
    }

    public Product applyDtoToProduct(ProductDto productDto, Product product) {
        product.setName(productDto.getName());
        product.setDescription(productDto.getDescription());
        product.setPrice(productDto.getPrice());
        product.setBrand(productDto.getBrand());
        product.setRating(productDto.getRating());
        product.setSlug(productDto.getSlug());
        product.setNewArrival(productDto.isNewArrival());

        Category category = categoryService.getCategory(productDto.getCategoryId());
        if (category != null) {
            product.setCategory(category);
            UUID categoryTypeId = productDto.getCategoryTypeId();
            CategoryType categoryType = category.getCategoryTypes()
                    .stream()
                    .filter(type -> type.getId().equals(categoryTypeId))
                    .findFirst()
                    .orElseThrow(() -> new CategoryNotFoundException("Category Type with ID not found"));
            product.setCategoryType(categoryType);
        } else {
            throw new CategoryNotFoundException("Category with ID " + productDto.getCategoryId() + " not found");
        }

        if (productDto.getVariants() != null && !productDto.getVariants().isEmpty()) {
            List<ProductVariant> productVariants = mapToProductVariants(productDto.getVariants(), product);
            product.setProductVariants(productVariants);
        } else {
            System.out.println("No product variants provided.");
        }
        if (productDto.getProductResources() != null && !productDto.getProductResources().isEmpty()) {
            List<Resources> productResources = mapToProductResources(productDto.getProductResources(), product);
            product.setResources(productResources);
        } else {
            System.out.println("No product resources provided.");
        }
        return product;
    }
    @Override
    public String deleteProduct(UUID id) {
        productRepository.deleteById(id);
        return new String("Deleting product with id" + id);
    }
}
