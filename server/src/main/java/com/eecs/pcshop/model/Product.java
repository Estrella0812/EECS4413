package com.eecs.pcshop.model;

import jakarta.persistence.*;
import lombok.*;
import java.util.List;

@Entity
@Data
@Table(name = "products")
public class Product {

    public enum Category {
        CPU, GPU, PSU, MEMORY, STORAGE, MOTHERBOARD, COOLER, CASE, PERIPHERAL
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "description")
    private String description;

    @Column(name = "price", nullable = false)
    private Double price;

    @Enumerated(EnumType.STRING)
    @Column(name = "category")
    private Category category;

    @Column(name = "quantity", nullable = false)
    private Integer quantity = 0;

    @ManyToOne(optional = false)
    @JoinColumn(name = "brand_id", nullable = false)
    private Brand brand;

    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Image> images;

}