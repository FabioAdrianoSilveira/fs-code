package com.foodsaver.repository;

import com.foodsaver.model.entity.Purchase;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface PurchaseRepository extends JpaRepository<Purchase, Long> {

    @Query("SELECT p FROM Purchase p WHERE p.customer.id = :customerId "
            + "ORDER BY p.createdAt DESC")
    List<Purchase> findByCustomerIdOrderByCreatedAtDesc(
            @Param("customerId") Long customerId);

    @Query("SELECT p FROM Purchase p WHERE p.shop.id = :shopId "
            + "ORDER BY p.createdAt DESC")
    List<Purchase> findByShopIdOrderByCreatedAtDesc(
            @Param("shopId") Long shopId);

    Optional<Purchase> findByIdAndCustomerId(Long id, Long customerId);
}
