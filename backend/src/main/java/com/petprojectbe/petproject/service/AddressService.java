package com.petprojectbe.petproject.service;

import com.petprojectbe.petproject.dto.request.AddressRequest;
import com.petprojectbe.petproject.entity.Address;
import com.petprojectbe.petproject.entity.User;
import com.petprojectbe.petproject.repository.AddressRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;

import java.security.Principal;
import java.util.List;

@Service
@Slf4j
public class AddressService {

    @Autowired
    private AddressRepository addressRepository;

    @Autowired
    private UserDetailsService userDetailsService;

    public Address createAddress(AddressRequest addressRequest, Principal principal) {
        User user = (User) userDetailsService.loadUserByUsername(principal.getName());
        Address address = Address.builder()
                .street(addressRequest.getStreet())
                .city(addressRequest.getCity())
                .state(addressRequest.getState())
                .zipCode(addressRequest.getZipCode())
                .phoneNumber(addressRequest.getPhoneNumber())
                .user(user)
                .build();
        return addressRepository.save(address);
    }

    public List<Address> getAllAddresses(Principal principal) {
        User user = (User) userDetailsService.loadUserByUsername(principal.getName());
        return addressRepository.findByUser(user);
    }
}
