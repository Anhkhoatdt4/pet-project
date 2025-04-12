package com.petprojectbe.petproject.mapper;

import com.petprojectbe.petproject.dto.CategoryDto;
import com.petprojectbe.petproject.dto.CategoryTypeDto;
import com.petprojectbe.petproject.entity.Category;
import com.petprojectbe.petproject.entity.CategoryType;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring")
public interface CategoryMapper {

    // Ánh xạ CategoryDto thành Category
    @Mapping(source = "categoryTypeDtoList", target = "categoryTypes")
    Category toEntity(CategoryDto categoryDto);

    List<CategoryType> toCategoryTypeList(List<CategoryDto> categoryDtoList);
}
