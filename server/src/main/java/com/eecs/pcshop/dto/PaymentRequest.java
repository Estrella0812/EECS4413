package com.eecs.pcshop.dto;

import lombok.Data;

@Data
public class PaymentRequest {
    private long cartId;
    private String currency;
}
