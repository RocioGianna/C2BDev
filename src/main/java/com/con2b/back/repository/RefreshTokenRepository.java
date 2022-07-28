package com.con2b.back.repository;

import com.con2b.back.model.RefreshToken;
import com.con2b.back.model.User2b;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RefreshTokenRepository extends JpaRepository<RefreshToken, Long> {
    RefreshToken findByToken(String token);
    int deleteByUser(User2b user);
}
