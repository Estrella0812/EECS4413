package com.eecs.pcshop.repository;

import com.eecs.pcshop.model.Cart;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CartRepository extends JpaRepository<Cart, Long> {
    // Optional<Cart> findBySessionKey(String sessionKey);
}
