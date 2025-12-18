package com.eecs.pcshop.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import com.eecs.pcshop.model.Order;
import com.eecs.pcshop.model.User;
import com.eecs.pcshop.repository.OrderRepository;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/orders")
@RequiredArgsConstructor
public class OrderController {

    private final OrderRepository orderRepository;

    @GetMapping
    public ResponseEntity<List<Order>> getMyOrders(Authentication authentication) {

        User user = (User) authentication.getPrincipal();

        List<Order> orders =
                orderRepository.findByUserOrderByCreatedAtDesc(user);

        return ResponseEntity.ok(orders);
    }
}
