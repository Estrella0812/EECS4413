package com.eecs.pcshop.dto;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ProductSummary {
    Long id;
    String mainImageUrl;
    String name;
    Double price;
    Integer stock;
}
