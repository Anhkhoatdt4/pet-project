package com.petprojectbe.petproject.repository;

import com.petprojectbe.petproject.entity.Address;
import com.petprojectbe.petproject.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface AddressRepository extends JpaRepository<Address, UUID> {
    List<Address> findByUser(User user);
}
