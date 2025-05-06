package com.petprojectbe.petproject.dto.response;

import com.petprojectbe.petproject.dto.request.OrderItemDetail;
import com.petprojectbe.petproject.entity.Address;
import com.petprojectbe.petproject.entity.OrderStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;
import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class OrderDetailsResponse {
    private UUID id;
    private Date orderDate;
    private Double totalAmount;
    private String shipmentNumber;
    private Date expectedDeliveryDate;
    private OrderStatus orderStatus;
    private Address address;
    private List<OrderItemDetail> orderItemDetails;
}
