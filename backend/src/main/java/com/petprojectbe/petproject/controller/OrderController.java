package com.petprojectbe.petproject.controller;

import com.petprojectbe.petproject.dto.request.OrderRequest;
import com.petprojectbe.petproject.entity.Order;
import com.petprojectbe.petproject.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@RestController
@RequestMapping("/order")
@CrossOrigin
public class OrderController {

    @Autowired
    OrderService orderService;

    @PostMapping
    public ResponseEntity<?> createOrder(@RequestBody OrderRequest orderRequest, Principal principal) throws Exception {
        Order order = orderService.createOrder(orderRequest,principal);
        return new ResponseEntity<>(order, HttpStatus.OK);
    }
}
