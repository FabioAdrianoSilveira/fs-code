package com.foodsaver.controller;

import com.foodsaver.dto.ProductResponse;
import com.foodsaver.dto.ShopRequest;
import com.foodsaver.dto.ShopResponse;
import com.foodsaver.service.ProductService;
import com.foodsaver.service.ShopService;
import jakarta.validation.Valid;
import java.util.List;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/shops")
public class ShopController {

    private final ShopService shopService;
    private final ProductService productService;

    public ShopController(ShopService shopService,
            ProductService productService) {
        this.shopService = shopService;
        this.productService = productService;
    }

    @GetMapping("/owner/{ownerId}")
    public ResponseEntity<ShopResponse> getByOwner(@PathVariable Long ownerId) {
        ShopResponse response = shopService.getShopByOwner(ownerId);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{shopId}")
    public ResponseEntity<ShopResponse> getById(
            @PathVariable Long shopId,
            @RequestHeader(value = "X-User-Id", required = false) Long userId) {
        ShopResponse response = shopService.getShopById(shopId, userId);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{shopId}/products")
    public ResponseEntity<List<ProductResponse>> listProducts(
            @PathVariable Long shopId) {
        List<ProductResponse> products = productService.listByShop(shopId);
        return ResponseEntity.ok(products);
    }

    @PutMapping("/owner/{ownerId}")
    public ResponseEntity<ShopResponse> updateShop(
            @PathVariable Long ownerId,
            @Valid @RequestBody ShopRequest request) {
        ShopResponse response = shopService.updateShop(ownerId, request);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/owner/{ownerId}")
    public ResponseEntity<Void> deleteShop(@PathVariable Long ownerId) {
        shopService.deleteShop(ownerId);
        return ResponseEntity.noContent().build();
    }
}
