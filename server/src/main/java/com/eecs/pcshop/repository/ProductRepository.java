package com.eecs.pcshop.repository;

import com.eecs.pcshop.model.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long>, JpaSpecificationExecutor<Product> {

    List<Product> findByBrand(Product.Brand brand);

    List<Product> findByCategory(Product.Category category);

    List<Product> findByNameContainingIgnoreCase(String keyword);

    List<Product> findByPriceBetween(Double min, Double max);

    List<Product> findAllByOrderByPriceAsc();

    List<Product> findAllByOrderByPriceDesc();

    List<Product> findByCategoryOrderByPriceAsc(Product.Category category);

    List<Product> findByCategoryOrderByPriceDesc(Product.Category category);
}
