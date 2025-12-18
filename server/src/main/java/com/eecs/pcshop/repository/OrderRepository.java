package com.eecs.pcshop.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.eecs.pcshop.model.Order;
import com.eecs.pcshop.model.User;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
    List<Order> findByUserOrderByCreatedAtDesc(User user);
    boolean existsByStripePaymentIntentId(String stripePaymentIntentId);
}

