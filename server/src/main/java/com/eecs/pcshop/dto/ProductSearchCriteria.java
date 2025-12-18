package com.eecs.pcshop.dto;

import com.eecs.pcshop.model.Product;
import lombok.Data;

@Data
public class ProductSearchCriteria {
    private String query;
    private Double minPrice;
    private Double maxPrice;
    private Product.Category category;
    private Product.Brand[] brands;
    private Boolean inStock;
}
