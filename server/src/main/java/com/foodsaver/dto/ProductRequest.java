package com.foodsaver.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.math.BigDecimal;
import java.time.LocalDate;

public class ProductRequest {

    @NotBlank(message = "Nome do produto e obrigatorio")
    private String name;

    @NotBlank(message = "Descricao do produto e obrigatoria")
    private String description;

    @NotNull(message = "Preco e obrigatorio")
    @Min(value = 0, message = "Preco deve ser positivo")
    private BigDecimal price;

    @NotNull(message = "Estoque e obrigatorio")
    @Min(value = 0, message = "Estoque deve ser positivo")
    private Integer stock;

    @NotNull(message = "Data de validade e obrigatoria")
    private LocalDate expirationDate;

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

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public Integer getStock() {
        return stock;
    }

    public void setStock(Integer stock) {
        this.stock = stock;
    }

    public LocalDate getExpirationDate() {
        return expirationDate;
    }

    public void setExpirationDate(LocalDate expirationDate) {
        this.expirationDate = expirationDate;
    }
}
