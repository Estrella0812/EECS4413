package com.eecs.pcshop.model;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@Table(name = "images")
public class Image {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "is_main")
    private Boolean isMain;

    @Column(name = "url", nullable = false)
    private String url;

    @Column(name = "alt_text")
    private String altText;

    @ManyToOne(optional = false)
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;

}
