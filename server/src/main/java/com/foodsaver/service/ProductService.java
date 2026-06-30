package com.foodsaver.service;

import com.foodsaver.dto.ProductRequest;
import com.foodsaver.dto.ProductResponse;
import com.foodsaver.exception.ApiException;
import com.foodsaver.model.entity.Product;
import com.foodsaver.model.entity.Shop;
import com.foodsaver.repository.ProductRepository;
import com.foodsaver.repository.ShopRepository;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class ProductService {

    private final ProductRepository productRepository;
    private final ShopRepository shopRepository;

    public ProductService(ProductRepository productRepository,
            ShopRepository shopRepository) {
        this.productRepository = productRepository;
        this.shopRepository = shopRepository;
    }

    public List<ProductResponse> listByShop(Long shopId) {
        return productRepository.findByShopId(shopId).stream()
                .map(ProductResponse::new)
                .collect(Collectors.toList());
    }

    public List<ProductResponse> listByOwner(Long ownerId) {
        return productRepository.findByShopOwnerId(ownerId).stream()
                .map(ProductResponse::new)
                .collect(Collectors.toList());
    }

    @Transactional
    public ProductResponse create(Long ownerId, ProductRequest request) {
        Shop shop = shopRepository.findByOwnerId(ownerId)
                .orElseThrow(() -> new ApiException(
                        "Loja nao encontrada", HttpStatus.NOT_FOUND.value()));

        Product product = new Product();
        applyRequest(product, request);
        product.setShop(shop);
        product = productRepository.save(product);
        return new ProductResponse(product);
    }

    @Transactional
    public ProductResponse update(Long ownerId, Long productId,
            ProductRequest request) {
        Product product = getOwnedProduct(ownerId, productId);
        applyRequest(product, request);
        product = productRepository.save(product);
        return new ProductResponse(product);
    }

    @Transactional
    public void delete(Long ownerId, Long productId) {
        Product product = getOwnedProduct(ownerId, productId);
        productRepository.delete(product);
    }

    public Product findById(Long productId) {
        return productRepository.findById(productId)
                .orElseThrow(() -> new ApiException(
                        "Produto nao encontrado", HttpStatus.NOT_FOUND.value()));
    }

    private Product getOwnedProduct(Long ownerId, Long productId) {
        Product product = findById(productId);

        if (!product.getShop().getOwner().getId().equals(ownerId)) {
            throw new ApiException(
                    "Produto nao pertence a este lojista",
                    HttpStatus.FORBIDDEN.value());
        }

        return product;
    }

    private void applyRequest(Product product, ProductRequest request) {
        product.setName(request.getName());
        product.setDescription(request.getDescription());
        product.setPrice(request.getPrice());
        product.setStock(request.getStock());
        product.setExpirationDate(request.getExpirationDate());
    }
}
