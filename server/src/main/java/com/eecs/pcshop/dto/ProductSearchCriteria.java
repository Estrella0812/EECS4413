package com.eecs.pcshop.dto;

import com.eecs.pcshop.model.Product;
import lombok.Data;

import java.util.List;

@Data
public class ProductSearchCriteria {
    private String query;
    private Double minPrice;
    private Double maxPrice;
    private Product.Category category;
    private List<Product.Brand> brands;
    private Boolean inStock;
}
