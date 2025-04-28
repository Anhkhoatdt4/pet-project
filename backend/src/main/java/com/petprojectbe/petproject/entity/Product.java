package com.petprojectbe.petproject.entity;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "products")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
@ToString(exclude = "categoryType")
public class Product {
    @Id
    @GeneratedValue
    UUID id;

    @Column(nullable = false)
    String name;

    @Column
    String description;

    @Column(nullable = false)
    BigDecimal price;

    @Column(nullable = false)
    String brand;

    @Column
    Float rating;

    @Column(nullable = false,unique = true)
    private String slug;

    @Column(nullable = false)
    boolean isNewArrival;

    @Column(nullable = false, updatable = false)
    @Temporal(TemporalType.TIMESTAMP)
    java.util.Date createdAt;

    @Column(nullable = false)
    @Temporal(TemporalType.TIMESTAMP)
    java.util.Date updatedAt;

    @OneToMany(mappedBy = "product",cascade = CascadeType.ALL)
    private List<ProductVariant> productVariants;

    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL)
    List<Resources> resources;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "categoryType_id" , nullable = false)
    @JsonIgnore
    CategoryType categoryType;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id" , nullable = false)
    @JsonIgnore
    Category category;

    @PrePersist
    protected void onCreate() {
        createdAt = new java.util.Date();
        updatedAt = createdAt;
    }
    @PreUpdate
    protected void onUpdate() {
        updatedAt = new java.util.Date();
    }

}
