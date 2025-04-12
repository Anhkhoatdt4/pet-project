package com.petprojectbe.petproject.service;

import com.petprojectbe.petproject.dto.CategoryDto;
import com.petprojectbe.petproject.dto.CategoryTypeDto;
import com.petprojectbe.petproject.entity.Category;
import com.petprojectbe.petproject.entity.CategoryType;
import com.petprojectbe.petproject.mapper.CategoryMapper;
import com.petprojectbe.petproject.repository.CategoryRepository;
import lombok.*;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
@Data
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
@Slf4j
public class CategoryService {
    CategoryRepository categoryRepository;
    CategoryMapper categoryMapper;
    public Category getCategory(UUID id) {
        Optional<Category> category = categoryRepository.findById(id);
        return category.orElse(null);
    }
    public Category createCategory(CategoryDto categoryDto) {
        Category category = categoryMapper.toEntity(categoryDto);
        if(category.getCategoryTypes() != null){
            for(CategoryType categoryType : category.getCategoryTypes()){
                categoryType.setCategory(category);
            }
        }
        return categoryRepository.save(category);
    }
    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }
    public Category updateCategory(CategoryDto categoryDto, UUID categoryId) {
        Category category = categoryRepository.findById(categoryId).orElseThrow(
                () -> new RuntimeException("Category not found" + categoryDto.getId())
        );

        // Cập nhật thông tin của category
        if (categoryDto.getName() != null) {
            category.setName(categoryDto.getName());
        }
        if (categoryDto.getCode() != null) {
            category.setCode(categoryDto.getCode());
        }
        if (categoryDto.getDescription() != null) {
            category.setDescription(categoryDto.getDescription());
        }
        List<CategoryTypeDto> typeDtos = Optional.ofNullable(categoryDto.getCategoryTypeDtoList()).orElse(new ArrayList<>());
        List<CategoryType> existingTypes = category.getCategoryTypes();
        if(existingTypes == null){
            existingTypes = new ArrayList<>();
            category.setCategoryTypes(existingTypes);
        }
        List<CategoryType> finalCategorytypes = new ArrayList<>();
        List<UUID> dtoIds = typeDtos.stream().map(CategoryTypeDto::getId).filter(Objects::nonNull).toList();
        List<CategoryType> remoteCategorytypes = new ArrayList<>();
        for(CategoryType existingCategoryType : existingTypes){
            if (existingCategoryType.getId() != null && !dtoIds.contains(existingCategoryType.getId())){
                // Nếu không có trong DTO -> đánh dấu để xóa hoặc loại bỏ khỏi collection
                remoteCategorytypes.add(existingCategoryType);
            }
        }
        existingTypes.removeAll(remoteCategorytypes);
        for(CategoryTypeDto typeDto : typeDtos){
            if (typeDto.getId() != null && !dtoIds.contains(typeDto.getId())){
                CategoryType categoryTypeToUpdate = existingTypes.stream()
                        .filter(existing -> existing.getId().equals(typeDto.getId()))
                        .findFirst()
                        .orElseThrow(() -> new RuntimeException("CategoryType with id " + typeDto.getId() + " not found in existing list for category " + categoryId));
                categoryTypeToUpdate.setCode(typeDto.getCode());
                categoryTypeToUpdate.setName(typeDto.getName());
                categoryTypeToUpdate.setDescription(typeDto.getDescription());
                finalCategorytypes.add(categoryTypeToUpdate);
            }
            else {
                CategoryType newCategoryType = CategoryType.builder().name(typeDto.getName())
                        .code(typeDto.getCode())
                        .description(typeDto.getDescription())
                        .category(category)
                        .build();
                existingTypes.add(newCategoryType);
                finalCategorytypes.add(newCategoryType);
            }
        }

        category.setCategoryTypes(existingTypes);
        return categoryRepository.save(category);
    }

    public void deleteCategory(UUID categoryId) {
        categoryRepository.deleteById(categoryId);
    }
}
