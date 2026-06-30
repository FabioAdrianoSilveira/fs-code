package com.foodsaver.dto;

import com.foodsaver.model.entity.Shop;

public class ShopResponse {

    private Long id;
    private String name;
    private String description;
    private String address;
    private Long ownerId;
    private boolean favorite;

    public ShopResponse() {
    }

    public ShopResponse(Shop shop) {
        this.id = shop.getId();
        this.name = shop.getName();
        this.description = shop.getDescription();
        this.address = shop.getAddress();
        this.ownerId = shop.getOwner().getId();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public Long getOwnerId() {
        return ownerId;
    }

    public void setOwnerId(Long ownerId) {
        this.ownerId = ownerId;
    }

    public boolean isFavorite() {
        return favorite;
    }

    public void setFavorite(boolean favorite) {
        this.favorite = favorite;
    }
}
