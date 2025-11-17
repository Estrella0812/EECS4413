package com.eecs.pcshop.repository;

import com.eecs.pcshop.model.Product;
import com.eecs.pcshop.model.Brand;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

    List<Product> findByBrand(Brand brand);

    List<Product> findByCategory(Product.Category category);

    List<Product> findByNameContainingIgnoreCase(String keyword);

    List<Product> findByPriceBetween(Double min, Double max);

    List<Product> findAllByOrderByPriceAsc();

    List<Product> findAllByOrderByPriceDesc();

    List<Product> findByCategoryOrderByPriceAsc(Product.Category category);

    List<Product> findByCategoryOrderByPriceDesc(Product.Category category);
}
