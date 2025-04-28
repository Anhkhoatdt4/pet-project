package com.petprojectbe.petproject.dto.request;



import lombok.*;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CategoryTypeDto {
    private UUID id;
    private String name;
    private String code;
    private String description;
}