package com.eecs.pcshop.service;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.stripe.Stripe;
import com.stripe.model.PaymentIntent;

import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class PaymentService {
    
    @Value("${stripe.secret-key}")
    private String secretKey;

    @PostConstruct
    public void init() {
        Stripe.apiKey = secretKey;
    }

    public PaymentIntent createPaymentIntent(double total, String currency) throws Exception {

        long amount = (long) (total * 100); // convert to cents for Stripe

        Map<String, Object> paymentMethodConfig = new HashMap<>();
        paymentMethodConfig.put("enabled", true);
        paymentMethodConfig.put("allow_redirects", "never");

        Map<String, Object> params = new HashMap<>();
        params.put("amount", amount);
        params.put("currency", currency);
        params.put("automatic_payment_methods", paymentMethodConfig);

        return PaymentIntent.create(params);

    }
}
