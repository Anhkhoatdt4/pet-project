package com.petprojectbe.petproject.dto;

import com.petprojectbe.petproject.entity.ProductVariant;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.UUID;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ProductVariantDto {
    UUID id;
    String color;
    String size;
    Integer stockQuantity;
}
