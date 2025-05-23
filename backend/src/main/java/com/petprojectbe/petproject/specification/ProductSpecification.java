package com.petprojectbe.petproject.specification;

import com.petprojectbe.petproject.entity.Product;
import org.springframework.data.jpa.domain.Specification;

import java.util.UUID;

public class ProductSpecification {
    public static Specification<Product> hasCategoryId(UUID categoryId) {
        return ((root, query, criteriaBuilder) -> criteriaBuilder.equal(root.get("category").get("id"), categoryId));
    }
    public static Specification<Product> hasTypeId(UUID typeId) {
        return ((root, query, criteriaBuilder) -> criteriaBuilder.equal(root.get("categoryType").get("id"), typeId));
    }
}
