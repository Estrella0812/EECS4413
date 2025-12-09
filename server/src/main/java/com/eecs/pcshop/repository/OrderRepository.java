package com.eecs.pcshop.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.eecs.pcshop.model.Order;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
}
