package com.petprojectbe.petproject.controller;

import com.petprojectbe.petproject.dto.request.AddressRequest;
import com.petprojectbe.petproject.dto.request.ApiResponse;
import com.petprojectbe.petproject.entity.Address;
import com.petprojectbe.petproject.service.AddressService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.UUID;

@RestController
@RequestMapping("/address")
@CrossOrigin
public class AddressController {

    @Autowired
    private AddressService addressService;

    @PostMapping
    public ResponseEntity<Address> createAddress(@RequestBody AddressRequest addressRequest, Principal principal){
        Address address = addressService.createAddress(addressRequest, principal);
        System.out.println("Address created: " + address);
        return  new ResponseEntity<>(address, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteAddressById(@PathVariable UUID id){
        System.out.println("Address deleted: " + id);
        addressService.deleteAddress(id);
        return new ResponseEntity<>("Address deleted" ,HttpStatus.OK);
    }
}
