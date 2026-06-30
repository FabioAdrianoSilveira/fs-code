package com.foodsaver.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import java.util.List;

public class CreatePurchaseRequest {

    @NotNull(message = "Loja e obrigatoria")
    private Long shopId;

    @NotEmpty(message = "Carrinho nao pode estar vazio")
    @Valid
    private List<PurchaseItemRequest> items;

    public Long getShopId() {
        return shopId;
    }

    public void setShopId(Long shopId) {
        this.shopId = shopId;
    }

    public List<PurchaseItemRequest> getItems() {
        return items;
    }

    public void setItems(List<PurchaseItemRequest> items) {
        this.items = items;
    }
}
