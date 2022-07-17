package com.example.demo.security.jwt;

import com.example.demo.user.AppUser;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RefreshTokenRepository extends JpaRepository<RefreshToken, Long> {
    RefreshToken findByToken(String token);
    int deleteByUser(AppUser appUser);
}
