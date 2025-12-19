package com.eecs.pcshop.dto;

import lombok.Data;

@Data
public class PaymentRequest {
    private long amount;
    private String currency;
}
