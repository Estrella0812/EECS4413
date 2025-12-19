package com.eecs.pcshop.controller;

import com.eecs.pcshop.model.Cart;
import com.eecs.pcshop.model.User;
import com.eecs.pcshop.service.CartService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "${frontend.origin}")
@RestController
@RequestMapping("/api/cart")
@RequiredArgsConstructor
public class CartController {

    private final CartService cartService;

    @GetMapping
    public ResponseEntity<Cart> getCart(@AuthenticationPrincipal User user) {
        return ResponseEntity.ok(cartService.getOrCreateCart(user.getId()));
    }

    @PostMapping("/add")
    public ResponseEntity<Cart> addItem(
            @AuthenticationPrincipal User user,
            @RequestParam Long productId,
            @RequestParam int quantity) {
        return ResponseEntity.ok(
                cartService.addItem(user.getId(), productId, quantity)
        );
    }

    @PutMapping("/update")
    public ResponseEntity<Cart> updateQuantity(
            @AuthenticationPrincipal User user,
            @RequestParam Long productId,
            @RequestParam int quantity) {

        return ResponseEntity.ok(
                cartService.updateQuantity(user.getId(), productId, quantity)
        );
    }

    @DeleteMapping("/remove")
    public ResponseEntity<Cart> removeItem(
            @AuthenticationPrincipal User user,
            @RequestParam Long productId) {

        return ResponseEntity.ok(
                cartService.removeItem(user.getId(), productId)
        );
    }

    @DeleteMapping("/clear")
    public ResponseEntity<Cart> clearCart(@AuthenticationPrincipal User user) {
        return ResponseEntity.ok(cartService.clearCart(user.getId()));
    }
}