package com.foodsaver.service;

import com.foodsaver.dto.CreatePurchaseRequest;
import com.foodsaver.dto.PurchaseItemRequest;
import com.foodsaver.dto.PurchaseResponse;
import com.foodsaver.exception.ApiException;
import com.foodsaver.model.entity.Product;
import com.foodsaver.model.entity.Purchase;
import com.foodsaver.model.entity.PurchaseItem;
import com.foodsaver.model.entity.Shop;
import com.foodsaver.model.entity.User;
import com.foodsaver.model.enums.PurchaseStatus;
import com.foodsaver.model.enums.UserRole;
import com.foodsaver.repository.PurchaseRepository;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class PurchaseService {

    private final PurchaseRepository purchaseRepository;
    private final AuthService authService;
    private final ShopService shopService;
    private final ProductService productService;

    public PurchaseService(PurchaseRepository purchaseRepository,
            AuthService authService,
            ShopService shopService,
            ProductService productService) {
        this.purchaseRepository = purchaseRepository;
        this.authService = authService;
        this.shopService = shopService;
        this.productService = productService;
    }

    @Transactional
    public PurchaseResponse createPurchase(Long customerId,
            CreatePurchaseRequest request) {
        User customer = authService.findUserById(customerId);

        if (customer.getRole() != UserRole.CUSTOMER) {
            throw new ApiException(
                    "Acesso permitido apenas para clientes",
                    HttpStatus.FORBIDDEN.value());
        }

        Shop shop = shopService.findShopById(request.getShopId());
        Purchase purchase = new Purchase();
        purchase.setCustomer(customer);
        purchase.setShop(shop);
        purchase.setStatus(PurchaseStatus.PENDING);
        purchase.setCreatedAt(LocalDateTime.now());
        purchase.setTotalAmount(BigDecimal.ZERO);

        BigDecimal total = BigDecimal.ZERO;

        for (PurchaseItemRequest itemRequest : request.getItems()) {
            Product product = productService.findById(itemRequest.getProductId());

            if (!product.getShop().getId().equals(shop.getId())) {
                throw new ApiException(
                        "Produto nao pertence a esta loja",
                        HttpStatus.BAD_REQUEST.value());
            }

            if (product.getStock() < itemRequest.getQuantity()) {
                throw new ApiException(
                        "Estoque insuficiente para " + product.getName(),
                        HttpStatus.BAD_REQUEST.value());
            }

            PurchaseItem item = new PurchaseItem();
            item.setProduct(product);
            item.setQuantity(itemRequest.getQuantity());
            item.setUnitPrice(product.getPrice());
            purchase.addItem(item);

            BigDecimal subtotal = product.getPrice()
                    .multiply(BigDecimal.valueOf(itemRequest.getQuantity()));
            total = total.add(subtotal);

            product.setStock(product.getStock() - itemRequest.getQuantity());
        }

        purchase.setTotalAmount(total);
        purchase = purchaseRepository.save(purchase);
        return new PurchaseResponse(purchase);
    }

    public List<PurchaseResponse> listCustomerPurchases(Long customerId) {
        return purchaseRepository.findByCustomerIdOrderByCreatedAtDesc(customerId)
                .stream()
                .map(PurchaseResponse::new)
                .collect(Collectors.toList());
    }

    public List<PurchaseResponse> listShopSales(Long ownerId) {
        Long shopId = shopService.getShopByOwner(ownerId).getId();
        return purchaseRepository.findByShopIdOrderByCreatedAtDesc(shopId)
                .stream()
                .map(PurchaseResponse::new)
                .collect(Collectors.toList());
    }

    @Transactional
    public PurchaseResponse confirmSale(Long ownerId, Long purchaseId) {
        Purchase purchase = getShopPurchase(ownerId, purchaseId);

        if (purchase.getStatus() != PurchaseStatus.PENDING) {
            throw new ApiException(
                    "Somente vendas pendentes podem ser confirmadas",
                    HttpStatus.BAD_REQUEST.value());
        }

        purchase.setStatus(PurchaseStatus.CONFIRMED);
        purchase = purchaseRepository.save(purchase);
        return new PurchaseResponse(purchase);
    }

    @Transactional
    public PurchaseResponse cancelPurchase(Long customerId, Long purchaseId) {
        Purchase purchase = purchaseRepository
                .findByIdAndCustomerId(purchaseId, customerId)
                .orElseThrow(() -> new ApiException(
                        "Compra nao encontrada", HttpStatus.NOT_FOUND.value()));

        if (purchase.getStatus() == PurchaseStatus.PICKED_UP) {
            throw new ApiException(
                    "Compras ja retiradas nao podem ser canceladas",
                    HttpStatus.BAD_REQUEST.value());
        }

        if (purchase.getStatus() == PurchaseStatus.CANCELLED) {
            throw new ApiException(
                    "Compra ja cancelada", HttpStatus.BAD_REQUEST.value());
        }

        restoreStock(purchase);
        purchase.setStatus(PurchaseStatus.CANCELLED);
        purchase = purchaseRepository.save(purchase);
        return new PurchaseResponse(purchase);
    }

    private Purchase getShopPurchase(Long ownerId, Long purchaseId) {
        Purchase purchase = purchaseRepository.findById(purchaseId)
                .orElseThrow(() -> new ApiException(
                        "Venda nao encontrada", HttpStatus.NOT_FOUND.value()));

        if (!purchase.getShop().getOwner().getId().equals(ownerId)) {
            throw new ApiException(
                    "Venda nao pertence a este lojista",
                    HttpStatus.FORBIDDEN.value());
        }

        return purchase;
    }

    private void restoreStock(Purchase purchase) {
        for (PurchaseItem item : purchase.getItems()) {
            Product product = item.getProduct();
            product.setStock(product.getStock() + item.getQuantity());
        }
    }
}
