package com.foodsaver.dto;

import com.foodsaver.model.entity.Purchase;
import com.foodsaver.model.enums.PurchaseStatus;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

public class PurchaseResponse {

    private Long id;
    private Long shopId;
    private String shopName;
    private Long customerId;
    private String customerName;
    private BigDecimal totalAmount;
    private PurchaseStatus status;
    private LocalDateTime createdAt;
    private List<PurchaseItemResponse> items;

    public PurchaseResponse() {
    }

    public PurchaseResponse(Purchase purchase) {
        this.id = purchase.getId();
        this.shopId = purchase.getShop().getId();
        this.shopName = purchase.getShop().getName();
        this.customerId = purchase.getCustomer().getId();
        this.customerName = purchase.getCustomer().getName();
        this.totalAmount = purchase.getTotalAmount();
        this.status = purchase.getStatus();
        this.createdAt = purchase.getCreatedAt();
        this.items = purchase.getItems().stream()
                .map(PurchaseItemResponse::new)
                .collect(Collectors.toList());
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getShopId() {
        return shopId;
    }

    public void setShopId(Long shopId) {
        this.shopId = shopId;
    }

    public String getShopName() {
        return shopName;
    }

    public void setShopName(String shopName) {
        this.shopName = shopName;
    }

    public Long getCustomerId() {
        return customerId;
    }

    public void setCustomerId(Long customerId) {
        this.customerId = customerId;
    }

    public String getCustomerName() {
        return customerName;
    }

    public void setCustomerName(String customerName) {
        this.customerName = customerName;
    }

    public BigDecimal getTotalAmount() {
        return totalAmount;
    }

    public void setTotalAmount(BigDecimal totalAmount) {
        this.totalAmount = totalAmount;
    }

    public PurchaseStatus getStatus() {
        return status;
    }

    public void setStatus(PurchaseStatus status) {
        this.status = status;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public List<PurchaseItemResponse> getItems() {
        return items;
    }

    public void setItems(List<PurchaseItemResponse> items) {
        this.items = items;
    }
}
