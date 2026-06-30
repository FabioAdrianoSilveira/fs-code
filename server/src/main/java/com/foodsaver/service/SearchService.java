package com.foodsaver.service;

import com.foodsaver.dto.ProductResponse;
import com.foodsaver.dto.SearchResponse;
import com.foodsaver.dto.ShopResponse;
import com.foodsaver.repository.ProductRepository;
import com.foodsaver.repository.ShopRepository;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.stereotype.Service;

@Service
public class SearchService {

    private final ShopRepository shopRepository;
    private final ProductRepository productRepository;

    public SearchService(ShopRepository shopRepository,
            ProductRepository productRepository) {
        this.shopRepository = shopRepository;
        this.productRepository = productRepository;
    }

    public SearchResponse search(String keyword) {
        List<ShopResponse> shops = shopRepository.searchByKeyword(keyword).stream()
                .map(ShopResponse::new)
                .collect(Collectors.toList());

        List<ProductResponse> products = productRepository
                .searchByKeyword(keyword).stream()
                .map(ProductResponse::new)
                .collect(Collectors.toList());

        return new SearchResponse(shops, products);
    }
}
