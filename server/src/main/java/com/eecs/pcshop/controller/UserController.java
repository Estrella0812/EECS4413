package com.eecs.pcshop.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.eecs.pcshop.dto.UserDto;
import com.eecs.pcshop.model.User;
import com.eecs.pcshop.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@CrossOrigin(origins = "${frontend.origin}")
@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserRepository userRepository;

    @GetMapping("/me")
    public ResponseEntity<UserDto> me(@AuthenticationPrincipal UserDetails u) {
        if (u == null) {
            return ResponseEntity.status(401).build();
        }

        User user = userRepository
                .findByEmail(u.getUsername())
                .orElseThrow();

        return ResponseEntity.ok(UserDto.from(user));
    }
}
