package com.foodsaver.controller;

import com.foodsaver.dto.PurchaseResponse;
import com.foodsaver.service.PurchaseService;
import java.util.List;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/sales")
public class SaleController {

    private final PurchaseService purchaseService;

    public SaleController(PurchaseService purchaseService) {
        this.purchaseService = purchaseService;
    }

    @GetMapping("/owner/{ownerId}")
    public ResponseEntity<List<PurchaseResponse>> listSales(
            @PathVariable Long ownerId) {
        List<PurchaseResponse> sales = purchaseService.listShopSales(ownerId);
        return ResponseEntity.ok(sales);
    }

    @PutMapping("/owner/{ownerId}/{purchaseId}/confirm")
    public ResponseEntity<PurchaseResponse> confirmSale(
            @PathVariable Long ownerId,
            @PathVariable Long purchaseId) {
        PurchaseResponse response = purchaseService.confirmSale(
                ownerId, purchaseId);
        return ResponseEntity.ok(response);
    }
}
