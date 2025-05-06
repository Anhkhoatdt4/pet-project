package com.petprojectbe.petproject.controller;

import com.petprojectbe.petproject.dto.request.OrderRequest;
import com.petprojectbe.petproject.dto.response.OrderDetailsResponse;
import com.petprojectbe.petproject.dto.response.OrderResponse;
import com.petprojectbe.petproject.entity.Order;
import com.petprojectbe.petproject.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/order")
@CrossOrigin
public class OrderController {

    @Autowired
    OrderService orderService;

    @PostMapping
    public ResponseEntity<OrderResponse> createOrder(@RequestBody OrderRequest orderRequest, Principal principal) throws Exception {
        OrderResponse orderResponse = orderService.createOrder(orderRequest,principal);
        return new ResponseEntity<>(orderResponse,HttpStatus.OK);
    }

    @PostMapping("/update-payment")
    public ResponseEntity<?> updatePaymentStatus(@RequestBody Map<String,String> request) throws Exception {
        Map<String,String> response = orderService.updateStatus(request.get("paymentIntent"),request.get("status"));
        return new ResponseEntity<>(response,HttpStatus.OK);
    }

    @GetMapping("/user")
    public ResponseEntity<List<OrderDetailsResponse>> getOrderByUser(Principal principal){
        System.out.println("princial : " + principal);
        List<OrderDetailsResponse> orderDetailsResponses = orderService.getOrderByUser(principal.getName());
        return new ResponseEntity<>(orderDetailsResponses , HttpStatus.OK);
    }

    @PostMapping("/cancel")
    public ResponseEntity<?>cancelOrder(@RequestParam UUID id, Principal principal) throws Exception{
        orderService.cancelOrder(id, principal);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/user/{id}")
    public ResponseEntity<OrderDetailsResponse> getOrderById(@PathVariable("id") UUID orderId, Principal principal) {
        System.out.println("principal: " + principal);
        OrderDetailsResponse orderDetails = orderService.getOrderById(orderId, principal.getName());
        return new ResponseEntity<>(orderDetails, HttpStatus.OK);
    }
}
