package com.petprojectbe.petproject.controller;

import com.petprojectbe.petproject.dto.request.ApiResponse;
import com.petprojectbe.petproject.dto.request.CategoryDto;
import com.petprojectbe.petproject.entity.Category;
import com.petprojectbe.petproject.service.CategoryService;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import lombok.*;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/category")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
@CrossOrigin
public class CategoryController {
    @Autowired
    private CategoryService categoryService;

    @PostMapping
     ResponseEntity<Category> addCategory(@RequestBody CategoryDto categoryDto) {
        Category category = categoryService.createCategory(categoryDto);
        return new ResponseEntity<>(category, HttpStatus.CREATED);
    }

    @GetMapping()
     ApiResponse<List<Category>> getCategory() {
        return ApiResponse.<List<Category>>builder().result(categoryService.getAllCategories()).build();
    }

    @GetMapping("/{id}")
     ApiResponse<Category> getCategoryById(@PathVariable(value = "id", required = true) UUID id) {
        return ApiResponse.<Category>builder().result(categoryService.getCategory(id)).build();
    }

    @PutMapping("/{id}")
    ApiResponse<Category> updateCategory(@RequestBody CategoryDto categoryDto, @PathVariable (value = "id", required = true) UUID id) {
        return ApiResponse.<Category>builder()
                .result(categoryService.updateCategory(categoryDto, id))
                .build();
    }

    @DeleteMapping("/{id}")
    ApiResponse<String> deleteCategory(@PathVariable(value = "id", required = true) UUID categoryId) {
        categoryService.deleteCategory(categoryId);
        return ApiResponse.<String>builder()
                .result("Category has been deleted successfully")
                .build();
    }
}
