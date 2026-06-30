package com.foodsaver.service;

import com.foodsaver.dto.ShopRequest;
import com.foodsaver.dto.ShopResponse;
import com.foodsaver.exception.ApiException;
import com.foodsaver.model.entity.Shop;
import com.foodsaver.model.entity.User;
import com.foodsaver.model.enums.UserRole;
import com.foodsaver.repository.FavoriteShopRepository;
import com.foodsaver.repository.ProductRepository;
import com.foodsaver.repository.ShopRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class ShopService {

    private final ShopRepository shopRepository;
    private final ProductRepository productRepository;
    private final FavoriteShopRepository favoriteShopRepository;
    private final AuthService authService;

    public ShopService(ShopRepository shopRepository,
            ProductRepository productRepository,
            FavoriteShopRepository favoriteShopRepository,
            AuthService authService) {
        this.shopRepository = shopRepository;
        this.productRepository = productRepository;
        this.favoriteShopRepository = favoriteShopRepository;
        this.authService = authService;
    }

    public ShopResponse getShopById(Long shopId, Long customerId) {
        Shop shop = findShopById(shopId);
        ShopResponse response = new ShopResponse(shop);

        if (customerId != null) {
            boolean favorite = favoriteShopRepository
                    .existsByCustomerIdAndShopId(customerId, shopId);
            response.setFavorite(favorite);
        }

        return response;
    }

    public ShopResponse getShopByOwner(Long ownerId) {
        Shop shop = shopRepository.findByOwnerId(ownerId)
                .orElseThrow(() -> new ApiException(
                        "Loja nao encontrada", HttpStatus.NOT_FOUND.value()));
        return new ShopResponse(shop);
    }

    @Transactional
    public ShopResponse updateShop(Long ownerId, ShopRequest request) {
        Shop shop = getOwnedShop(ownerId);
        shop.setName(request.getName());
        shop.setDescription(request.getDescription());
        shop.setAddress(request.getAddress());
        shop = shopRepository.save(shop);
        return new ShopResponse(shop);
    }

    @Transactional
    public void deleteShop(Long ownerId) {
        Shop shop = getOwnedShop(ownerId);
        productRepository.findByShopId(shop.getId())
                .forEach(productRepository::delete);
        shopRepository.delete(shop);
        authService.deleteUser(ownerId);
    }

    public Shop findShopById(Long shopId) {
        return shopRepository.findById(shopId)
                .orElseThrow(() -> new ApiException(
                        "Loja nao encontrada", HttpStatus.NOT_FOUND.value()));
    }

    private Shop getOwnedShop(Long ownerId) {
        User owner = authService.findUserById(ownerId);

        if (owner.getRole() != UserRole.SHOPKEEPER) {
            throw new ApiException(
                    "Acesso permitido apenas para lojistas",
                    HttpStatus.FORBIDDEN.value());
        }

        return shopRepository.findByOwnerId(ownerId)
                .orElseThrow(() -> new ApiException(
                        "Loja nao encontrada", HttpStatus.NOT_FOUND.value()));
    }
}
