package com.foodsaver.repository;

import com.foodsaver.model.entity.Shop;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ShopRepository extends JpaRepository<Shop, Long> {

    Optional<Shop> findByOwnerId(Long ownerId);

    @Query("SELECT s FROM Shop s WHERE "
            + "LOWER(s.name) LIKE LOWER(CONCAT('%', :keyword, '%')) OR "
            + "LOWER(s.description) LIKE LOWER(CONCAT('%', :keyword, '%'))")
    List<Shop> searchByKeyword(@Param("keyword") String keyword);
}
