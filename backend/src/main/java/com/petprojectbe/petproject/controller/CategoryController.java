package com.petprojectbe.petproject.controller;

import com.petprojectbe.petproject.dto.request.CategoryDto;
import com.petprojectbe.petproject.entity.Category;
import com.petprojectbe.petproject.service.CategoryService;
import jakarta.servlet.http.HttpServletResponse;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import lombok.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
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
    ResponseEntity<List<Category>> getCategory(HttpServletResponse response) {
        List<Category> categoryList = categoryService.getAllCategories();
        response.setHeader("Content-Range", String.valueOf(categoryList.size()));
        return new ResponseEntity<>(categoryList, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    ResponseEntity<Category> getCategoryById(@PathVariable(value = "id", required = true) UUID id) {
        return new ResponseEntity(categoryService.getCategory(id), HttpStatus.OK);
    }

    @PutMapping("/{id}")
    ResponseEntity<Category> updateCategory(@RequestBody CategoryDto categoryDto, @PathVariable(value = "id", required = true) UUID id) {
        Category updatedCategory = categoryService.updateCategory(categoryDto, id);
        return new ResponseEntity<>(updatedCategory, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    ResponseEntity<Void> deleteCategory(@PathVariable(value = "id", required = true) UUID categoryId) {
        categoryService.deleteCategory(categoryId);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping()
    ResponseEntity<Map<String,UUID>> deleteCategoryType(@RequestParam(value = "id", required = true) UUID categoryTypeId) {
        categoryService.deleteCategoryType(categoryTypeId);
        Map<String, UUID> response = new HashMap<>();
        response.put("id" , categoryTypeId);
        return ResponseEntity.ok(response);
    }
}