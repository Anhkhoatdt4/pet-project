package com.petprojectbe.petproject.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OrderRequest {
    private UUID userId ;
    private Date orderDate;
    private UUID addressId ;
    private double totalAmount;
    private String paymentMethod;
    private Double discount;
    private Date expectedDeliveryDate;
    private List<OrderItemRequest> orderItemRequests;
}
