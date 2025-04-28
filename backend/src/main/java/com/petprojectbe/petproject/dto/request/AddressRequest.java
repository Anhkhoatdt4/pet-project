package com.petprojectbe.petproject.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AddressRequest {
    private String name;
    private String street;
    private String city;
    private String state ;
    private String zipCode;
    private String phoneNumber;
}
