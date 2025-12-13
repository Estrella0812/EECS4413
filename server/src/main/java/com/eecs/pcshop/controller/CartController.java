package com.eecs.pcshop.controller;

import com.eecs.pcshop.model.Cart;
import com.eecs.pcshop.service.CartService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "${frontend.origin}")
@RestController
@RequestMapping("/api/cart")
@RequiredArgsConstructor
public class CartController {

    private final CartService cartService;

    @GetMapping("/{userId}")
    public ResponseEntity<Cart> getCart(@PathVariable Long userId) {
        return ResponseEntity.ok(cartService.getOrCreateCart(userId));
    }

    @PostMapping("/{userId}/add")
    public ResponseEntity<Cart> addItem(
            @PathVariable Long userId,
            @RequestParam Long productId,
            @RequestParam int quantity) {
        return ResponseEntity.ok(cartService.addItem(userId, productId, quantity));
    }

    @PutMapping("/{userId}/update")
    public ResponseEntity<Cart> updateQuantity(
            @PathVariable Long userId,
            @RequestParam Long productId,
            @RequestParam int quantity) {
        return ResponseEntity.ok(cartService.updateQuantity(userId, productId, quantity));
    }

    @DeleteMapping("/{userId}/remove")
    public ResponseEntity<Cart> removeItem(
            @PathVariable Long userId,
            @RequestParam Long productId) {
        return ResponseEntity.ok(cartService.removeItem(userId, productId));
    }

    @DeleteMapping("/{userId}/clear")
    public ResponseEntity<Cart> clearCart(@PathVariable Long userId) {
        return ResponseEntity.ok(cartService.clearCart(userId));
    }

    @ExceptionHandler({IllegalArgumentException.class})
    public ResponseEntity<String> handleExceptions(RuntimeException e) {
        return ResponseEntity.badRequest().body(e.getMessage());
    }
    
}
