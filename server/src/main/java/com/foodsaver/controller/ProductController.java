package com.foodsaver.controller;

import com.foodsaver.dto.ProductRequest;
import com.foodsaver.dto.ProductResponse;
import com.foodsaver.service.ProductService;
import jakarta.validation.Valid;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/products")
public class ProductController {

    private final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping("/owner/{ownerId}")
    public ResponseEntity<List<ProductResponse>> listByOwner(
            @PathVariable Long ownerId) {
        List<ProductResponse> products = productService.listByOwner(ownerId);
        return ResponseEntity.ok(products);
    }

    @PostMapping("/owner/{ownerId}")
    public ResponseEntity<ProductResponse> create(
            @PathVariable Long ownerId,
            @Valid @RequestBody ProductRequest request) {
        ProductResponse response = productService.create(ownerId, request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PutMapping("/owner/{ownerId}/{productId}")
    public ResponseEntity<ProductResponse> update(
            @PathVariable Long ownerId,
            @PathVariable Long productId,
            @Valid @RequestBody ProductRequest request) {
        ProductResponse response = productService.update(
                ownerId, productId, request);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/owner/{ownerId}/{productId}")
    public ResponseEntity<Void> delete(
            @PathVariable Long ownerId,
            @PathVariable Long productId) {
        productService.delete(ownerId, productId);
        return ResponseEntity.noContent().build();
    }
}
