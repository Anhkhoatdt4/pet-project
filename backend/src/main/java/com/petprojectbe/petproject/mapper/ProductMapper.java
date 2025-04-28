package com.petprojectbe.petproject.mapper;

import com.petprojectbe.petproject.dto.request.ProductDto;
import com.petprojectbe.petproject.dto.request.ProductResourceDto;
import com.petprojectbe.petproject.dto.request.ProductVariantDto;
import com.petprojectbe.petproject.entity.Product;
import com.petprojectbe.petproject.entity.ProductVariant;
import com.petprojectbe.petproject.entity.Resources;
import com.petprojectbe.petproject.exception.ProductNotFoundException;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring")
public interface ProductMapper {
    @Mapping(source = "variants" , target = "productVariants")
    @Mapping(source = "productResources" , target = "resources")
    @Mapping(source = "categoryId", target = "category.id")
    @Mapping(source = "categoryName", target = "category.name")
    @Mapping(source = "categoryTypeId", target = "categoryType.id")
    @Mapping(source = "categoryTypeName", target = "categoryType.name")
    Product toProduct(ProductDto productDto);

    Resources toResources(ProductResourceDto dto);
    ProductVariant toProductVariant(ProductVariantDto dto);

    @Mapping(target = "thumbnail", expression = "java(getProductThumbnail(product.getResources()))")
    ProductDto toProductDto(Product product);

    default String getProductThumbnail(List<Resources> resources) {
        return resources.stream().filter(Resources::getIsPrimary).map(Resources::getUrl).findFirst()
                .orElseThrow(() -> new ProductNotFoundException("Product not found"));
    }

    ProductVariantDto toProductVariantDto(ProductVariant productVariant);
    ProductResourceDto toProductResourceDto(Resources resources);
    // Map ProductVariant List to ProductVariantDto List
    List<ProductVariantDto> mapProductVariantListToDto(List<ProductVariant> productVariants);

    // Map Resources List to ProductResourceDto List
    List<ProductResourceDto> mapProductResourcesListDto(List<Resources> resources);

}
