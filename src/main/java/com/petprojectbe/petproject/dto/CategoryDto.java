package com.petprojectbe.petproject.dto;

import lombok.*;
import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CategoryDto {
    private UUID id;
    private String name;
    private String description;
    private String code;
    private List<CategoryTypeDto> categoryTypeDtoList;
}
