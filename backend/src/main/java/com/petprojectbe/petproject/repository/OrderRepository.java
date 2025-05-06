package com.petprojectbe.petproject.repository;

import com.petprojectbe.petproject.entity.Order;
import com.petprojectbe.petproject.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface OrderRepository extends JpaRepository<Order, UUID> {
    @Query("""
    SELECT DISTINCT o FROM Order o
    LEFT JOIN FETCH o.orderItems oi
    LEFT JOIN FETCH oi.product p
    WHERE o.user = :user
""")
    List<Order> findByUser(@Param("user") User user);
    Optional<Order> findByIdAndUser(UUID id, User user);

}
