package com.eecs.pcshop.dto;

import com.eecs.pcshop.model.User;

public record UserDto(
        Long id,
        String email,
        String role
) {
    public static UserDto from(User user) {
        return new UserDto(
                user.getId(),
                user.getEmail(),
                user.getRole() != null ? user.getRole().name() : null
        );
    }
}
