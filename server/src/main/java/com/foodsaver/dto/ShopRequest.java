package com.foodsaver.dto;

import jakarta.validation.constraints.NotBlank;

public class ShopRequest {

    @NotBlank(message = "Nome da loja e obrigatorio")
    private String name;

    @NotBlank(message = "Descricao da loja e obrigatoria")
    private String description;

    @NotBlank(message = "Endereco da loja e obrigatorio")
    private String address;

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

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }
}
