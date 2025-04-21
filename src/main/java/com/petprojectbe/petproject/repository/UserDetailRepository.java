package com.petprojectbe.petproject.repository;

import com.petprojectbe.petproject.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface UserDetailRepository extends JpaRepository<User, UUID> {
    User findByEmail(String email);
}
