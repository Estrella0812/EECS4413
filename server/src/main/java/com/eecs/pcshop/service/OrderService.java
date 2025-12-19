package com.eecs.pcshop.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.eecs.pcshop.model.Cart;
import com.eecs.pcshop.model.Order;
import com.eecs.pcshop.model.OrderItem;
import com.eecs.pcshop.model.Product;
import com.eecs.pcshop.model.User;
import com.eecs.pcshop.repository.CartRepository;
import com.eecs.pcshop.repository.OrderRepository;
import com.eecs.pcshop.repository.ProductRepository;
import com.eecs.pcshop.repository.UserRepository;
import com.stripe.model.PaymentIntent;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class OrderService {

    private final CartRepository cartRepository;
    private final OrderRepository orderRepository;
    private final UserRepository userRepository;
    private final ProductRepository productRepository;

    public void createOrderFromPayment(PaymentIntent intent) {

        // Prevent duplicate webhook processing
        /* if (orderRepository.existsByStripePaymentIntentId(intent.getId())) {
            return;
        } */
        System.out.println("Payment1");
        Long cartId = Long.parseLong(intent.getMetadata().get("cartId"));
        Long userId = Long.parseLong(intent.getMetadata().get("userId"));

        Cart cart = cartRepository.findById(cartId)
                .orElseThrow(() -> new RuntimeException("Cart not found"));

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Order order = new Order();
        order.setTotal(cart.getTotal());
        order.setUser(user);
        order.setStripePaymentIntentId(intent.getId());

        System.out.println("running6");
        List<OrderItem> items = cart.getItems().stream().map(ci -> {

            Product product = ci.getProduct();

            product.setStock(
                product.getStock() - ci.getQuantity()
            );
            productRepository.save(product);

            OrderItem oi = new OrderItem();
            oi.setOrder(order);
            oi.setProduct(ci.getProduct());
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
