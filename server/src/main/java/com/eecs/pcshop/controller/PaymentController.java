package com.eecs.pcshop.controller;

import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.eecs.pcshop.dto.PaymentRequest;
import com.eecs.pcshop.service.PaymentService;
import com.stripe.model.PaymentIntent;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/payments")
@RequiredArgsConstructor
public class PaymentController {

    private final PaymentService paymentService;

    @PostMapping("/create")
    public ResponseEntity<?> createPayment(@RequestBody PaymentRequest request) {
        try {
            PaymentIntent intent =
                paymentService.createPaymentIntent(request.getCartId(), request.getCurrency());

            return ResponseEntity.ok(Map.of("clientSecret", intent.getClientSecret()));
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error: " + e.getMessage());
        }
    }
}
