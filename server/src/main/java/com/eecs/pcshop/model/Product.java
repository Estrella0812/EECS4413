package com.eecs.pcshop.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "products")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Product {

    public enum Category {
        CPU, GPU, PSU, MEMORY, STORAGE, MOTHERBOARD, COOLER, CASE, PERIPHERAL
    }

    public enum Brand {
        AMD, Intel, NVIDIA, ASUS, MSI, Corsair, Samsung, Kingston, EVGA, CoolerMaster
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

    @Column(name = "stock", nullable = false)
    private Integer stock;

    @Enumerated(EnumType.STRING)
    @Column(name = "brand")
    private Brand brand;

    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL,  fetch = FetchType.LAZY)
    @JsonManagedReference
    private List<Image> images = new ArrayList<>();

    public String getMainImageUrl() {
        return images.stream()
                .filter(Image::getIsMain)
                .findFirst()
                .map(Image::getUrl)
                .orElse("default.jpg");
    }
}