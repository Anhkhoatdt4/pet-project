package com.petprojectbe.petproject.exception;

import com.petprojectbe.petproject.dto.ApiResponse;
import jakarta.validation.ConstraintViolation;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.nio.file.AccessDeniedException;
import java.util.HashMap;
import java.util.Map;
import java.util.Objects;

@RestControllerAdvice
@Slf4j
public class GlobalExceptionHandler {
    private static final String MIN_ATTRIBUTE = "min";

    @ExceptionHandler(value = Exception.class)
    ResponseEntity<ApiResponse> handlingRuntimeException(RuntimeException exception){
        log.error("Error: " , exception);
        return ResponseEntity.badRequest()
                .body(ApiResponse.builder()
                        .code(ErrorCode.UNCATEGORIZED_EXCEPTION.getCode())
                        .message(ErrorCode.UNCATEGORIZED_EXCEPTION.getMessage()).build());
    }

    @ExceptionHandler(value = AppException.class)
    ResponseEntity<ApiResponse> handlingAppException(AppException exception){
        ErrorCode errorCode = exception.getErrorCode();
        log.error("Error: " , exception);
        return ResponseEntity.status(errorCode.getCode())
                .body(ApiResponse.builder().code(errorCode.getCode()).message(errorCode.getMessage()).build());
    }

    @ExceptionHandler(value = AccessDeniedException.class)
    ResponseEntity<ApiResponse> handlingAccessDeniedException(AccessDeniedException exception){
        ErrorCode errorCode = ErrorCode.UNAUTHORIZED;
        return ResponseEntity.status(errorCode.getCode())
                .body(ApiResponse.builder().message(errorCode.getMessage()).code(errorCode.getCode()).build());
    }

    @ExceptionHandler(value = MethodArgumentNotValidException.class)
    ResponseEntity<ApiResponse> handlingValidation(MethodArgumentNotValidException exception){
        String enumKey = exception.getFieldError().getDefaultMessage();
        // Mặc định là lỗi INVALID_KEY nếu không có enumKey hợp lệ
        ErrorCode errorCode = ErrorCode.INVALID_KEY;
        log.error("Error: " , exception);
        // Biến lưu trữ các thuộc tính bổ sung liên quan đến lỗi
        Map<String, Object> attributes = null;
        try {
            // Kiểm tra nếu enumKey có tồn tại trong ErrorCode
            errorCode = ErrorCode.valueOf(enumKey);
            var fieldError = exception.getBindingResult().getFieldErrors().get(0);
            if (fieldError != null) {
                var constraintViolation = (ConstraintViolation<?>) fieldError.unwrap(ConstraintViolation.class);
                if (constraintViolation != null) {
                    // Lấy các thuộc tính bổ sung từ ConstraintViolation
                    attributes = constraintViolation.getConstraintDescriptor().getAttributes();
                    // Log các thuộc tính để xem chi tiết về lỗi (ví dụ: min value, max value)
                    log.info(attributes.toString());
                }
            }
        }catch(Exception ex){
            ex.printStackTrace();
        }
        ApiResponse apiResponse = new ApiResponse();
        apiResponse.setCode(errorCode.getCode());
        apiResponse.setMessage(
                Objects.nonNull(attributes)
                ? mapAttribute(errorCode.getMessage(), attributes) : errorCode.getMessage()
        );
        return ResponseEntity.badRequest().body(apiResponse);
    }

    private String mapAttribute(String message, Map<String, Object> attributes) {
        String minValue = String.valueOf(attributes.get("min"));
        return message.replace("{min}", minValue);
    }

    @ExceptionHandler(value = CategoryNotFoundException.class)
    ResponseEntity<ApiResponse> handleCategoryNotFound(CategoryNotFoundException ex) {
        ErrorCode errorCode = ErrorCode.CATEGORY_NOT_FOUND;
        ApiResponse apiResponse = new ApiResponse();
        apiResponse.setCode(errorCode.getCode());
        apiResponse.setMessage(errorCode.getMessage());
        return ResponseEntity.status(errorCode.getStatusCode()).body(apiResponse);
    }

    // Xử lý lỗi Category name không hợp lệ
    @ExceptionHandler(value = InvalidCategoryNameException.class)
    ResponseEntity<ApiResponse> handleInvalidCategoryName(InvalidCategoryNameException ex) {
        ErrorCode errorCode = ErrorCode.INVALID_CATEGORY_NAME;
        ApiResponse apiResponse = new ApiResponse();
        apiResponse.setCode(errorCode.getCode());
        apiResponse.setMessage(errorCode.getMessage());
        return ResponseEntity.status(errorCode.getStatusCode()).body(apiResponse);
    }

    // Xử lý lỗi Product không tìm thấy
    @ExceptionHandler(value = ProductNotFoundException.class)
    ResponseEntity<ApiResponse> handleProductNotFound(ProductNotFoundException ex) {
        ErrorCode errorCode = ErrorCode.PRODUCT_NOT_FOUND;
        ApiResponse apiResponse = new ApiResponse();
        apiResponse.setCode(errorCode.getCode());
        apiResponse.setMessage(errorCode.getMessage());
        return ResponseEntity.status(errorCode.getStatusCode()).body(apiResponse);
    }

    // Xử lý lỗi Product price không hợp lệ
    @ExceptionHandler(value = InvalidProductPriceException.class)
    ResponseEntity<ApiResponse> handleInvalidProductPrice(InvalidProductPriceException ex) {
        ErrorCode errorCode = ErrorCode.PRODUCT_PRICE_INVALID;
        ApiResponse apiResponse = new ApiResponse();
        apiResponse.setCode(errorCode.getCode());
        apiResponse.setMessage(errorCode.getMessage());
        return ResponseEntity.status(errorCode.getStatusCode()).body(apiResponse);
    }
}
