package com.eecs.pcshop.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RestController;

import com.eecs.pcshop.service.OrderService;
import com.stripe.model.Event;
import com.stripe.model.EventDataObjectDeserializer;
import com.stripe.model.PaymentIntent;
import com.stripe.model.StripeObject;
import com.stripe.net.Webhook;

@RestController
@RequestMapping("/api/webhooks")
@RequiredArgsConstructor
public class StripeWebhookController {

    @Value("${stripe.webhook-secret}")
    private String webhookSecret;

    private final OrderService orderService;

    @PostMapping("/stripe")
    public ResponseEntity<String> handleWebhook(@RequestBody String payload, @RequestHeader("Stripe-Signature") String sigHeader) {

        Event event;

        try {
            event = Webhook.constructEvent(payload, sigHeader, webhookSecret);
        } catch (Exception e) {
            return ResponseEntity.status(400).body("Invalid Signature");
        }

        EventDataObjectDeserializer deserializer = event.getDataObjectDeserializer();

        Optional<StripeObject> optionalObject = deserializer.getObject();

        if (optionalObject.isEmpty()) {
            System.out.println("Could not deserialize Stripe event object.");
            return ResponseEntity.ok("ignored");
        }

        StripeObject stripeObject = optionalObject.get();
        String eventType = event.getType();

        if (eventType.equals("payment_intent.succeeded")) {
            if (stripeObject instanceof PaymentIntent intent) {
                    orderService.createOrderFromPayment(intent);
            }
        }
        else {
            System.out.println("Received unhandled event type: " + eventType);
        }

        return ResponseEntity.ok("Webhook received");
    }
}
