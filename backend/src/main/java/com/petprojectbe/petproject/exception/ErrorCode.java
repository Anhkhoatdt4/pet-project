package com.petprojectbe.petproject.exception;

import lombok.Getter;
import org.apache.tomcat.util.http.parser.HttpParser;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;

@Getter
public enum ErrorCode {
    // General Errors
    UNCATEGORIZED_EXCEPTION(9999, "Uncategorized error", HttpStatus.INTERNAL_SERVER_ERROR),
    INVALID_KEY(1001, "Invalid key", HttpStatus.BAD_REQUEST),

    USERNAME_INVALID(1003, "Username must be at least {min} characters", HttpStatus.BAD_REQUEST),
    INVALID_PASSWORD(1004, "Password must be at least {min} characters", HttpStatus.BAD_REQUEST),
    USER_NOT_EXISTED(1005, "User does not exist", HttpStatus.NOT_FOUND),
    UNAUTHENTICATED(1006, "Unauthenticated", HttpStatus.UNAUTHORIZED),
    UNAUTHORIZED(1007, "You do not have permission", HttpStatus.FORBIDDEN),
    INVALID_DOB(1008, "Your age must be at least {min}", HttpStatus.BAD_REQUEST),
    INVALID_EMAIL(1009, "Invalid email address", HttpStatus.BAD_REQUEST),
    EMAIL_IS_REQUIRED(1010, "Email is required", HttpStatus.BAD_REQUEST),

    // Category Errors
    CATEGORY_NOT_FOUND(2001, "Category not found", HttpStatus.NOT_FOUND),
    CATEGORY_ALREADY_EXISTS(2002, "Category already exists", HttpStatus.BAD_REQUEST),
    INVALID_CATEGORY_NAME(2003, "Category name must be at least {min} characters", HttpStatus.BAD_REQUEST),

    // Product Errors
    PRODUCT_NOT_FOUND(3001, "Product not found", HttpStatus.NOT_FOUND),
    PRODUCT_ALREADY_EXISTS(3002, "Product already exists", HttpStatus.BAD_REQUEST),
    INVALID_PRODUCT_NAME(3003, "Product name must be at least {min} characters", HttpStatus.BAD_REQUEST),
    PRODUCT_PRICE_INVALID(3004, "Product price is not valid", HttpStatus.BAD_REQUEST);

    private final int code;
    private final String message;
    private final HttpStatusCode statusCode;

    ErrorCode(int code, String message, HttpStatusCode statusCode) {
        this.code = code;
        this.message = message;
        this.statusCode = statusCode;
    }


}
