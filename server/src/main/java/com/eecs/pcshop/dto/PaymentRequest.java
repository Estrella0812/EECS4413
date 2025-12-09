package com.eecs.pcshop.dto;

import lombok.Data;

@Data
public class PaymentRequest {
    private Long cartId;     // Which cart is being checked out
    private String currency; // Usually "usd" or "cad"
}
