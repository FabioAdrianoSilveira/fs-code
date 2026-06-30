package com.foodsaver.service;

import com.foodsaver.dto.ShopResponse;
import com.foodsaver.exception.ApiException;
import com.foodsaver.model.entity.FavoriteShop;
import com.foodsaver.model.entity.Shop;
import com.foodsaver.model.entity.User;
import com.foodsaver.model.enums.UserRole;
import com.foodsaver.repository.FavoriteShopRepository;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class FavoriteService {

    private final FavoriteShopRepository favoriteShopRepository;
    private final AuthService authService;
    private final ShopService shopService;

    public FavoriteService(FavoriteShopRepository favoriteShopRepository,
            AuthService authService,
            ShopService shopService) {
        this.favoriteShopRepository = favoriteShopRepository;
        this.authService = authService;
        this.shopService = shopService;
    }

    @Transactional
    public ShopResponse addFavorite(Long customerId, Long shopId) {
        User customer = authService.findUserById(customerId);

        if (customer.getRole() != UserRole.CUSTOMER) {
            throw new ApiException(
                    "Acesso permitido apenas para clientes",
                    HttpStatus.FORBIDDEN.value());
        }

        Shop shop = shopService.findShopById(shopId);

        if (favoriteShopRepository.existsByCustomerIdAndShopId(
                customerId, shopId)) {
            throw new ApiException(
                    "Loja ja favoritada", HttpStatus.CONFLICT.value());
        }

        FavoriteShop favorite = new FavoriteShop();
        favorite.setCustomer(customer);
        favorite.setShop(shop);
        favoriteShopRepository.save(favorite);

        ShopResponse response = new ShopResponse(shop);
        response.setFavorite(true);
        return response;
    }

    @Transactional
    public void removeFavorite(Long customerId, Long shopId) {
        FavoriteShop favorite = favoriteShopRepository
                .findByCustomerIdAndShopId(customerId, shopId)
                .orElseThrow(() -> new ApiException(
                        "Favorito nao encontrado", HttpStatus.NOT_FOUND.value()));
        favoriteShopRepository.delete(favorite);
    }

    public List<ShopResponse> listFavorites(Long customerId) {
        return favoriteShopRepository.findByCustomerId(customerId).stream()
                .map(favorite -> {
                    ShopResponse response = new ShopResponse(favorite.getShop());
                    response.setFavorite(true);
                    return response;
                })
                .collect(Collectors.toList());
    }
}
