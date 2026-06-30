package com.foodsaver.controller;

import com.foodsaver.dto.CreatePurchaseRequest;
import com.foodsaver.dto.PurchaseResponse;
import com.foodsaver.service.PurchaseService;
import jakarta.validation.Valid;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/purchases")
public class PurchaseController {

    private final PurchaseService purchaseService;

    public PurchaseController(PurchaseService purchaseService) {
        this.purchaseService = purchaseService;
    }

    @PostMapping("/customer/{customerId}")
    public ResponseEntity<PurchaseResponse> createPurchase(
            @PathVariable Long customerId,
            @Valid @RequestBody CreatePurchaseRequest request) {
        PurchaseResponse response = purchaseService.createPurchase(
                customerId, request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping("/customer/{customerId}")
    public ResponseEntity<List<PurchaseResponse>> listPurchases(
            @PathVariable Long customerId) {
        List<PurchaseResponse> purchases = purchaseService
                .listCustomerPurchases(customerId);
        return ResponseEntity.ok(purchases);
    }

    @PutMapping("/customer/{customerId}/{purchaseId}/cancel")
    public ResponseEntity<PurchaseResponse> cancelPurchase(
            @PathVariable Long customerId,
            @PathVariable Long purchaseId) {
        PurchaseResponse response = purchaseService.cancelPurchase(
                customerId, purchaseId);
        return ResponseEntity.ok(response);
    }
}
