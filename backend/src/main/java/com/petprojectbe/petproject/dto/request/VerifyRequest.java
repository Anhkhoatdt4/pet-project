package com.petprojectbe.petproject.dto.request;

import lombok.Data;

@Data
public class VerifyRequest {
    private String userName;
    private String code;
}
