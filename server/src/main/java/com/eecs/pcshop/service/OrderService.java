package com.eecs.pcshop.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.eecs.pcshop.model.Cart;
import com.eecs.pcshop.model.Order;
import com.eecs.pcshop.model.OrderItem;
import com.eecs.pcshop.repository.CartRepository;
import com.eecs.pcshop.repository.OrderRepository;
import com.stripe.model.PaymentIntent;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class OrderService {

    private final CartRepository cartRepository;
    private final OrderRepository orderRepository;

    public void createOrderFromPayment(PaymentIntent intent) {

        Long cartId = Long.parseLong(intent.getMetadata().get("cartId"));

        Cart cart = cartRepository.findById(cartId)
                .orElseThrow(() -> new RuntimeException("Cart not found"));

        Order order = new Order();
        order.setTotal(cart.getTotal());
        order.setStatus(Order.Status.PAID);

        List<OrderItem> items = cart.getItems().stream().map(ci -> {
            OrderItem oi = new OrderItem();
            oi.setOrder(order);
            oi.setProduct(ci.getProduct());
            oi.setPrice(ci.getProduct().getPrice());
            oi.setQuantity(ci.getQuantity());
            return oi;
        }).toList();

        order.setItems(items);

        orderRepository.save(order);

        // Clear cart after order is finalized
        cart.getItems().clear();
        cartRepository.save(cart);
    }
}
