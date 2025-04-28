package com.petprojectbe.petproject.service;

import com.petprojectbe.petproject.dto.request.OrderItemRequest;
import com.petprojectbe.petproject.dto.request.OrderRequest;
import com.petprojectbe.petproject.dto.request.ProductDto;
import com.petprojectbe.petproject.entity.*;
import com.petprojectbe.petproject.repository.OrderRepository;
import jakarta.transaction.Transactional;
import org.apache.coyote.BadRequestException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;

import java.security.Principal;
import java.util.Date;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class OrderService {
    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private UserDetailsService userDetailsService;

    @Autowired
    private ProductService productService;

    @Transactional
    public Order createOrder(OrderRequest orderRequest, Principal principal) throws Exception{
        User user = (User) userDetailsService.loadUserByUsername(principal.getName());
        Address address = user.getAddressList().stream()
                .filter(address1 -> orderRequest.getAddressId().equals(address1.getId()))
                .findFirst()
                .orElseThrow(BadRequestException::new);
        List<ProductDto> productList = orderRequest.getOrderItemRequests().stream()
                .map(OrderItemRequest::getProductId)
                .map(productService::getProductById)
                .collect(Collectors.toList());

        String trackingNumber = "SHIP-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase();

        Order order = Order.builder()
                .orderDate(orderRequest.getOrderDate())
                .address(address)
                .totalAmount(orderRequest.getTotalAmount())
                .discount(orderRequest.getDiscount())
                .paymentMethod(orderRequest.getPaymentMethod())
                .orderStatus(OrderStatus.PENDING)
                .expectedDeliveryDate(orderRequest.getExpectedDeliveryDate())
                .user(user)
                .shipmentTrackingNumber(trackingNumber)
                .build();

        List<OrderItem> orderItems = orderRequest.getOrderItemRequests().stream()
                .map(orderItemRequest -> {
                    try {
                        Product product = productService.fetchProductById(orderItemRequest.getProductId());
                        Double itemPrice = product.getPrice().doubleValue();
                        OrderItem orderItem = OrderItem
                                .builder()
                                .order(order)
                                .product(product)
                                .quantity(orderItemRequest.getQuantity())
                                .itemPrice(itemPrice)
                                .productVariantId(orderItemRequest.getProductVariantId())
                                .build();
                        return orderItem;
                    } catch (Exception e){
                        throw new RuntimeException(e);
                    }
                }).toList();

        order.setOrderItems(orderItems);

        Payment payment = Payment.builder()
                .paymentDate(new Date())
                .paymentStatus(PaymentStatus.PENDING)
                .order(order)
                .amount(order.getTotalAmount())
                .paymentMethod(order.getPaymentMethod())
                .build();
        order.setPayment(payment);
        return orderRepository.save(order);
    }
}
