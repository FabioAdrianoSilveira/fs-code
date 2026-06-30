package com.foodsaver.dto;

import java.util.List;

public class SearchResponse {

    private List<ShopResponse> shops;
    private List<ProductResponse> products;

    public SearchResponse() {
    }

    public SearchResponse(List<ShopResponse> shops, List<ProductResponse> products) {
        this.shops = shops;
        this.products = products;
    }

    public List<ShopResponse> getShops() {
        return shops;
    }

    public void setShops(List<ShopResponse> shops) {
        this.shops = shops;
    }

    public List<ProductResponse> getProducts() {
        return products;
    }

    public void setProducts(List<ProductResponse> products) {
        this.products = products;
    }
}
