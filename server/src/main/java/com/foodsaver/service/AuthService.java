package com.foodsaver.service;

import com.foodsaver.dto.AuthResponse;
import com.foodsaver.dto.LoginRequest;
import com.foodsaver.dto.RegisterCustomerRequest;
import com.foodsaver.dto.RegisterShopkeeperRequest;
import com.foodsaver.dto.UpdateUserRequest;
import com.foodsaver.dto.UserResponse;
import com.foodsaver.exception.ApiException;
import com.foodsaver.model.entity.Shop;
import com.foodsaver.model.entity.User;
import com.foodsaver.model.enums.UserRole;
import com.foodsaver.repository.ShopRepository;
import com.foodsaver.repository.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final ShopRepository shopRepository;

    public AuthService(UserRepository userRepository, ShopRepository shopRepository) {
        this.userRepository = userRepository;
        this.shopRepository = shopRepository;
    }

    @Transactional
    public AuthResponse registerShopkeeper(RegisterShopkeeperRequest request) {
        validateEmailAvailable(request.getEmail());

        User user = new User();
        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPassword(request.getPassword());
        user.setPhone(request.getPhone());
        user.setRole(UserRole.SHOPKEEPER);
        user = userRepository.save(user);

        Shop shop = new Shop();
        shop.setName(request.getShopName());
        shop.setDescription(request.getShopDescription());
        shop.setAddress(request.getShopAddress());
        shop.setOwner(user);
        shop = shopRepository.save(shop);

        return buildAuthResponse(user, shop.getId());
    }

    @Transactional
    public AuthResponse registerCustomer(RegisterCustomerRequest request) {
        validateEmailAvailable(request.getEmail());

        User user = new User();
        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPassword(request.getPassword());
        user.setPhone(request.getPhone());
        user.setRole(UserRole.CUSTOMER);
        user = userRepository.save(user);

        return buildAuthResponse(user, null);
    }

    public AuthResponse login(LoginRequest request) {
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new ApiException(
                        "Email ou senha invalidos", HttpStatus.UNAUTHORIZED.value()));

        if (!user.getPassword().equals(request.getPassword())) {
            throw new ApiException(
                    "Email ou senha invalidos", HttpStatus.UNAUTHORIZED.value());
        }

        Long shopId = null;
        if (user.getRole() == UserRole.SHOPKEEPER) {
            shopId = shopRepository.findByOwnerId(user.getId())
                    .map(Shop::getId)
                    .orElse(null);
        }

        return buildAuthResponse(user, shopId);
    }

    public UserResponse getUser(Long userId) {
        User user = findUserById(userId);
        return new UserResponse(user);
    }

    @Transactional
    public UserResponse updateUser(Long userId, UpdateUserRequest request) {
        User user = findUserById(userId);

        if (!user.getEmail().equals(request.getEmail())
                && userRepository.existsByEmail(request.getEmail())) {
            throw new ApiException("Email ja cadastrado", HttpStatus.CONFLICT.value());
        }

        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPhone(request.getPhone());

        if ((request.getPassword() != null) && !request.getPassword().isBlank()) {
            user.setPassword(request.getPassword());
        }

        user = userRepository.save(user);
        return new UserResponse(user);
    }

    @Transactional
    public void deleteUser(Long userId) {
        User user = findUserById(userId);

        if (user.getRole() == UserRole.SHOPKEEPER) {
            shopRepository.findByOwnerId(userId).ifPresent(shopRepository::delete);
        }

        userRepository.delete(user);
    }

    public User findUserById(Long userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new ApiException(
                        "Usuario nao encontrado", HttpStatus.NOT_FOUND.value()));
    }

    private void validateEmailAvailable(String email) {
        if (userRepository.existsByEmail(email)) {
            throw new ApiException("Email ja cadastrado", HttpStatus.CONFLICT.value());
        }
    }

    private AuthResponse buildAuthResponse(User user, Long shopId) {
        return new AuthResponse(
                user.getId(),
                user.getName(),
                user.getEmail(),
                user.getRole(),
                shopId);
    }
}
