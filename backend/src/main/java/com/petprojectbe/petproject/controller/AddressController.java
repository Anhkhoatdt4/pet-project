package com.petprojectbe.petproject.controller;

import com.petprojectbe.petproject.dto.request.AddressRequest;
import com.petprojectbe.petproject.dto.request.ApiResponse;
import com.petprojectbe.petproject.entity.Address;
import com.petprojectbe.petproject.service.AddressService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;

@RestController
@RequestMapping("/address")
public class AddressController {

    @Autowired
    private AddressService addressService;

    @PostMapping
    public ApiResponse<String> createAddress(@RequestBody AddressRequest addressRequest, Principal principal){
        Address address = addressService.createAddress(addressRequest, principal);
        System.out.println("Address created: " + address);
        return ApiResponse.<String>builder()
                .result("Address created successfully")
                .build();
    }
}
