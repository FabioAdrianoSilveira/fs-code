package com.foodsaver.controller;

import com.foodsaver.dto.ShopResponse;
import com.foodsaver.service.FavoriteService;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/api/favorites")
public class FavoriteController {

    private final FavoriteService favoriteService;

    public FavoriteController(FavoriteService favoriteService) {
        this.favoriteService = favoriteService;
    }

    @GetMapping("/customer/{customerId}")
    public ResponseEntity<List<ShopResponse>> listFavorites(
            @PathVariable Long customerId) {
        List<ShopResponse> favorites = favoriteService.listFavorites(customerId);
        return ResponseEntity.ok(favorites);
    }

    @PostMapping("/customer/{customerId}/shop/{shopId}")
    public ResponseEntity<ShopResponse> addFavorite(
            @PathVariable Long customerId,
            @PathVariable Long shopId) {
        ShopResponse response = favoriteService.addFavorite(customerId, shopId);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @DeleteMapping("/customer/{customerId}/shop/{shopId}")
    public ResponseEntity<Void> removeFavorite(
            @PathVariable Long customerId,
            @PathVariable Long shopId) {
        favoriteService.removeFavorite(customerId, shopId);
        return ResponseEntity.noContent().build();
    }
}
