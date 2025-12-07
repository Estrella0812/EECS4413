package com.eecs.pcshop.service;

import com.eecs.pcshop.model.*;
import com.eecs.pcshop.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
@RequiredArgsConstructor
public class CartService {

    private final CartRepository cartRepository;
    private final CartItemRepository cartItemRepository;
    private final ProductRepository productRepository;
    private final UserRepository userRepository;

    public Cart getOrCreateCart(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        if (user.getCart() != null) {
            return user.getCart();
        }

        Cart cart = new Cart();
        cart.setUser(user);
        user.setCart(cart);
        return cartRepository.save(cart);
    }
    
    public Cart addItem(Long userId, Long productId, int quantity) {
        Cart cart = getOrCreateCart(userId);
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Product not found"));

        CartItem item = cart.getItems().stream()
            .filter(i -> i.getProduct().getId().equals(productId))
            .findFirst()
            .orElse(null);

        if (item != null) {
            int updatedQuantity = item.getQuantity() + quantity;
            if (updatedQuantity > item.getProduct().getStock() || updatedQuantity < 1)
                throw new IllegalArgumentException("Invalid quantity");
            item.setQuantity(item.getQuantity() + quantity);
        } else {
            if (quantity < 1)
                throw new IllegalArgumentException("Quantity must be greater than 0");

            item = new CartItem();
            item.setCart(cart);
            item.setProduct(product);
            item.setQuantity(quantity);
            cart.getItems().add(item);

        }
        cartItemRepository.save(item);

        return cart;
    }

    public Cart updateQuantity(Long userId, Long productId, int quantity) {
        Cart cart = getOrCreateCart(userId);

        cart.getItems().stream()
                .filter(i -> i.getProduct().getId().equals(productId))
                .findFirst()
                .ifPresent(item -> {
                    item.setQuantity(quantity);
                    cartItemRepository.save(item);
                });

        return cart;
    }

    public Cart removeItem(Long userId, Long productId) {
        Cart cart = getOrCreateCart(userId);
        
        cart.getItems().removeIf(i -> {
            if (i.getProduct().getId().equals(productId)) {
                cartItemRepository.delete(i);
                return true;
            }
            return false;
        });

        return cartRepository.save(cart);
    }

    public Cart clearCart(Long userId) {
        Cart cart = getOrCreateCart(userId);

        cartItemRepository.deleteAll(cart.getItems());
        cart.getItems().clear();

        return cartRepository.save(cart);
    }
}
