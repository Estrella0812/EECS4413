package com.eecs.pcshop.service;

import com.eecs.pcshop.dto.ProductSearchCriteria;
import com.eecs.pcshop.dto.ProductSummary;
import com.eecs.pcshop.model.Product;
import com.eecs.pcshop.repository.ProductRepository;
import com.eecs.pcshop.repository.specification.ProductSpecification;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepository productRepository;

    public Page<ProductSummary> getFilteredSummaries(ProductSearchCriteria criteria, Pageable pageable) {
        Specification<Product> spec = ProductSpecification.buildQuery(criteria);
        Page<Product> productPage = productRepository.findAll(spec, pageable);
        return productPage.map(this::mapToSummary);
    }

    private ProductSummary mapToSummary(Product product) {
        return ProductSummary.builder()
                .id(product.getId())
                .name(product.getName())
                .price(product.getPrice())
                .stock(product.getStock())
                .mainImageUrl(product.getMainImageUrl())
                .build();
    }
}