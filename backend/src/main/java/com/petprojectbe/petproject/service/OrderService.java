package com.petprojectbe.petproject.service;

import com.petprojectbe.petproject.dto.request.OrderItemRequest;
import com.petprojectbe.petproject.dto.request.OrderRequest;
import com.petprojectbe.petproject.dto.request.ProductDto;
import com.petprojectbe.petproject.dto.response.OrderResponse;
import com.petprojectbe.petproject.entity.*;
import com.petprojectbe.petproject.repository.OrderRepository;
import com.stripe.Stripe;
import com.stripe.model.PaymentIntent;
import jakarta.transaction.Transactional;
import org.apache.coyote.BadRequestException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;

import java.security.Principal;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class OrderService {
//
//    @Value("${stripe.secret}")
//    private String stripeSecretKey;
//
//    public void initializeStripe() {
//        Stripe.apiKey = stripeSecretKey;
//    }
    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private UserDetailsService userDetailsService;

    @Autowired
    private ProductService productService;

    @Autowired
    private PaymentIntentService paymentIntentService;

    @Transactional
    public OrderResponse createOrder(OrderRequest orderRequest, Principal principal) throws Exception{
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

        Order savedOrder = orderRepository.save(order);

        OrderResponse orderResponse = OrderResponse.builder()
                .paymentMethod(orderRequest.getPaymentMethod())
                .orderId(savedOrder.getId())
                .build();
        System.out.println("122211");
        if(Objects.equals(orderRequest.getPaymentMethod(), "CARD")){
            System.out.println("111");
            orderResponse.setCredentials(paymentIntentService.createPaymentIntent(order));
        }
        return orderResponse;
    }

    public Map<String,String> updateStatus (String paymentIntentId, String status) throws Exception {
        try {
            System.out.println("paymentIntentId : " + paymentIntentId);
            System.out.println("status : " + status);
            PaymentIntent paymentIntent = PaymentIntent.retrieve(paymentIntentId);
            if (paymentIntent != null && paymentIntent.getStatus().equals("succeeded")){
                String orderId = paymentIntent.getMetadata().get("orderId");
                System.out.println("orderID : " + orderId);
                Order order = orderRepository.findById(UUID.fromString(orderId)).orElseThrow(BadRequestException::new);
                Payment payment = order.getPayment();
                payment.setPaymentStatus(PaymentStatus.COMPLETED);
                payment.setPaymentMethod(paymentIntent.getPaymentMethod());
                order.setPaymentMethod(paymentIntent.getPaymentMethod());
                order.setPayment(payment);
                order.setOrderStatus(OrderStatus.CONFIRMED);
                Order saveOrder = orderRepository.save(order);
                Map<String,String> map = new HashMap<>();
                map.put("orderId",String.valueOf(saveOrder.getId()));
                return map;
            }
            else {
                throw new IllegalArgumentException("PaymentIntent not found or missing metadata");
            }
        }
        catch (Exception e){
            throw new Exception("PaymentIntent not found or missing metadata");
        }
    }
}
