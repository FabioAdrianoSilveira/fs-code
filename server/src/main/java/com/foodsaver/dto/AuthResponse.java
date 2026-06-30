package com.foodsaver.dto;

import com.foodsaver.model.enums.UserRole;

public class AuthResponse {

    private Long userId;
    private String name;
    private String email;
    private UserRole role;
    private Long shopId;

    public AuthResponse() {
    }

    public AuthResponse(Long userId, String name, String email,
            UserRole role, Long shopId) {
        this.userId = userId;
        this.name = name;
        this.email = email;
        this.role = role;
        this.shopId = shopId;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public UserRole getRole() {
        return role;
    }

    public void setRole(UserRole role) {
        this.role = role;
    }

    public Long getShopId() {
        return shopId;
    }

    public void setShopId(Long shopId) {
        this.shopId = shopId;
    }
}
