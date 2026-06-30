package com.foodsaver.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

public class PurchaseItemRequest {

    @NotNull(message = "Produto e obrigatorio")
    private Long productId;

    @NotNull(message = "Quantidade e obrigatoria")
    @Min(value = 1, message = "Quantidade minima e 1")
    private Integer quantity;

    public Long getProductId() {
        return productId;
    }

    public void setProductId(Long productId) {
        this.productId = productId;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }
}
