package com.eecs.pcshop.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;

@Entity
public class ProductImage {
        @Id
        private Long id;

        private String imageUrl;
        private Boolean isMain;
        private String caption;

        @ManyToOne
        private Product product;

}
