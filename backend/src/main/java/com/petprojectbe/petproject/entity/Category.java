package com.petprojectbe.petproject.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collector;
import java.util.stream.Collectors;

@Entity
@Table(name = "categories")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@ToString(exclude = {"products", "categoryTypes"})
public class Category {
    @Id
    @GeneratedValue
    UUID id;

    @Column(nullable = false)
    String name;

    @Column(nullable = false)
    String code;
    @Column(nullable = false)
    String description;

    @OneToMany(mappedBy = "category", cascade = CascadeType.ALL)
    List<CategoryType> categoryTypes;

    @OneToMany(mappedBy = "category", cascade = CascadeType.ALL)
    List<Product> products;

}
