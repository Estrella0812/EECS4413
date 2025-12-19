package com.eecs.pcshop.service;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.eecs.pcshop.model.Cart;
import com.eecs.pcshop.repository.CartRepository;
import com.stripe.Stripe;
import com.stripe.model.PaymentIntent;

import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class PaymentService {
    
    @Value("${stripe.secret-key}")
    private String secretKey;

    private final CartRepository cartRepository;

    @PostConstruct
    public void init() {
        Stripe.apiKey = secretKey;
    }

    public PaymentIntent createPaymentIntent(long cartId, String currency) throws Exception {

        Cart cart = cartRepository.findById(cartId).orElseThrow(() -> new RuntimeException("Cart not found"));

        long amount = (long) (cart.getTotal() * 100); // convert to cents for Stripe

        Map<String, Object> paymentMethodConfig = new HashMap<>();
        paymentMethodConfig.put("enabled", true);
        paymentMethodConfig.put("allow_redirects", "never");

        Map<String, Object> params = new HashMap<>();
        params.put("amount", amount);
        params.put("currency", currency);
        params.put("automatic_payment_methods", paymentMethodConfig);
        params.put("metadata", Map.of(
            "cartId", cart.getId().toString(),
            "userId", String.valueOf(cart.getUser().getId())
        ));

        return PaymentIntent.create(params);

    }
}
