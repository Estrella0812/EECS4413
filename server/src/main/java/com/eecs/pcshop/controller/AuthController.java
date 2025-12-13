package com.eecs.pcshop.controller;

import com.eecs.pcshop.model.Cart;
import com.eecs.pcshop.model.User;
import com.eecs.pcshop.repository.UserRepository;
import com.eecs.pcshop.security.JwtService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;

import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;

@CrossOrigin(origins = "${frontend.origin}")
@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody LoginRequest req) {

        if (userRepository.existsByEmail(req.getEmail())) {
            return ResponseEntity.badRequest().body("Email already used");
        }
        Cart cart = new Cart();
        User user = User.builder()
                .email(req.getEmail())
                .password(passwordEncoder.encode(req.getPassword()))
                .cart(cart)
                .build();
        cart.setUser(user);
        userRepository.save(user);

        return ResponseEntity.ok("Registered successfully");
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest req, HttpServletResponse response) {
        User user = userRepository.findByEmail(req.getEmail()).orElse(null);

        if (user == null || !passwordEncoder.matches(req.getPassword(), user.getPassword())) {
            return ResponseEntity.status(401).body("Invalid credentials");
        }

        String jwt = jwtService.generateToken(user);

        ResponseCookie cookie = ResponseCookie.from("jwt", jwt)
            .httpOnly(true)
            .secure(true) // true in production with HTTPS
            .sameSite("None")
            .path("/")
            .maxAge(24 * 60 * 60)
            .build();

        response.addHeader("Set-Cookie", cookie.toString());
        System.out.println(user.getId());
        return ResponseEntity.ok("Logged in");
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpServletResponse response) {

        ResponseCookie cookie = ResponseCookie.from("jwt", "")
            .httpOnly(true)
            .secure(true)        
            .sameSite("None")     
            .path("/")
            .maxAge(0)             
            .build();

        response.addHeader("Set-Cookie", cookie.toString());

        return ResponseEntity.ok("Logged out");
    }

    @PostMapping("/refresh")
    public ResponseEntity<?> refresh(HttpServletRequest request, HttpServletResponse response) {
        String oldJwt = jwtService.extractJwtFromCookies(request);

        if (oldJwt == null || oldJwt.isEmpty())
            return ResponseEntity.status(401).body("Missing token");

        String email = jwtService.extractEmail(oldJwt);
        if (email == null || email.isEmpty()) {
            return ResponseEntity.status(401).body("Invalid token payload");
        }
        User user = userRepository.findByEmail(email).orElse(null);
        if (user == null) {
            return ResponseEntity.status(401).body("Invalid user");
        }

        // Generate new JWT
        String newJwt = jwtService.generateToken(user);

        // Set new cookie
        Cookie cookie = new Cookie("jwt", newJwt);
        cookie.setHttpOnly(true);
        cookie.setSecure(false); // set true in prod
        cookie.setPath("/");
        cookie.setMaxAge(24 * 60 * 60);

        response.addCookie(cookie);

        return ResponseEntity.ok()
                .header(HttpHeaders.SET_COOKIE, cookie.toString())
                .body("Token refreshed");
    }
}
