package com.eecs.pcshop.repository;

import com.eecs.pcshop.model.Cart;
import org.springframework.data.jpa.repository.JpaRepository;


public interface CartRepository extends JpaRepository<Cart, Long> {
    
}
