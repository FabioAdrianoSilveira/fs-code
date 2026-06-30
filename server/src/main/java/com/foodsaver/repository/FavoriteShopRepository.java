package com.foodsaver.repository;

import com.foodsaver.model.entity.FavoriteShop;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FavoriteShopRepository extends JpaRepository<FavoriteShop, Long> {

    List<FavoriteShop> findByCustomerId(Long customerId);

    Optional<FavoriteShop> findByCustomerIdAndShopId(Long customerId, Long shopId);

    boolean existsByCustomerIdAndShopId(Long customerId, Long shopId);
}
