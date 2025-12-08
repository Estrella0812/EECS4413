package com.eecs.pcshop.controller;

import lombok.RequiredArgsConstructor;
import com.eecs.pcshop.model.Product;
import com.eecs.pcshop.repository.ProductRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "${frontend.origin}")
@RestController
@RequestMapping("/api/products")
@RequiredArgsConstructor
public class ProductController {

    private final ProductRepository productRepository;

    // Get all products
    @GetMapping
    public ResponseEntity<List<Product>> getAllProducts() {
        List<Product> products = productRepository.findAll();
        return ResponseEntity.ok(products);
    }

    // Get product by ID
    @GetMapping("/{id}")
    public ResponseEntity<Product> getProductById(@PathVariable Long id) {
        return productRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // sort by price ascending
    @GetMapping("/sort/price/asc")
    public ResponseEntity<List<Product>> getProductsPriceLowToHigh() {
        return ResponseEntity.ok(productRepository.findAllByOrderByPriceAsc());
    }

    // sort by price descending
    @GetMapping("/sort/price/desc")
    public ResponseEntity<List<Product>> getProductsPriceHighToLow() {
        return ResponseEntity.ok(productRepository.findAllByOrderByPriceDesc());
    }

    // Sort by category
    @GetMapping("/category/{category}")
    public ResponseEntity<List<Product>> getProductsByCategory(@PathVariable Product.Category category) {
        return ResponseEntity.ok(productRepository.findByCategory(category));
    }

    // category + price ascending
    @GetMapping("/category/{category}/price/asc")
    public ResponseEntity<List<Product>> getProductsByCategoryPriceAsc(@PathVariable Product.Category category) {
        return ResponseEntity.ok(productRepository.findByCategoryOrderByPriceAsc(category));
    }

    // category + price descending
    @GetMapping("/category/{category}/price/desc")
    public ResponseEntity<List<Product>> getProductsByCategoryPriceDesc(@PathVariable Product.Category category) {
        return ResponseEntity.ok(productRepository.findByCategoryOrderByPriceDesc(category));
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/add")
    public ResponseEntity<Product> addProduct(@RequestBody Product product) {
        //TODO: need ability to upload images
        return ResponseEntity.ok(productRepository.save(product));
    }
}