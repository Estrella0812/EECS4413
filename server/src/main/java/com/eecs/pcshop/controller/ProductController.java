package com.eecs.pcshop.controller;

import com.eecs.pcshop.model.Image;
import com.eecs.pcshop.service.ImageService;

import java.io.File;
import java.io.IOException;
import lombok.RequiredArgsConstructor;
import com.eecs.pcshop.model.Product;
import com.eecs.pcshop.repository.ProductRepository;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.IntStream;

@CrossOrigin(origins = "${frontend.origin}")
@RestController
@RequestMapping("/api/products")
@RequiredArgsConstructor
public class ProductController {

    private final ProductRepository productRepository;
    private final ImageService imageService;

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
    @PostMapping(path = "/add", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> addProduct(
            @ModelAttribute Product product,
            @RequestParam("main") int mainImage,
            @RequestPart("imageFiles") MultipartFile[] imageFiles
            ) {
        List<Image> imageDTOs = new ArrayList<>();
        for (int i = 0; i < imageFiles.length; i++) {
            try {
                File imageFile = imageService.uploadImage(imageFiles[i], product.getName());
                Image image = Image.builder()
                        .url(imageFile.getCanonicalPath())
                        .isMain(i == mainImage)
                        .build();
                imageDTOs.add(image);
            } catch (IOException e) {
                return ResponseEntity.internalServerError().body(e.getMessage());
            }
        }
        // This must be done before adding to products
        imageDTOs.forEach(image -> image.setProduct(product));

        product.getImages().addAll(imageDTOs);
        return ResponseEntity.ok(productRepository.save(product));
    }
}