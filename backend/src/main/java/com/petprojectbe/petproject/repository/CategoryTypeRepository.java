package com.petprojectbe.petproject.repository;

import com.petprojectbe.petproject.entity.CategoryType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface CategoryTypeRepository extends JpaRepository<CategoryType, UUID> {
    void deleteCategoryTypeById(UUID id);
}
