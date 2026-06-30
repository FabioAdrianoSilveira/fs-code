package com.foodsaver.repository;

import com.foodsaver.model.entity.User;
import com.foodsaver.model.enums.UserRole;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByEmail(String email);

    boolean existsByEmail(String email);

    Optional<User> findByIdAndRole(Long id, UserRole role);
}
