package com.con2b.back.service.user;

import com.con2b.back.model.user.PasswordResetToken;
import com.con2b.back.model.user.RefreshToken;
import com.con2b.back.repository.user.PasswordResetTokenRepository;
import com.con2b.back.repository.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.Instant;
import java.util.UUID;

@Service
@Transactional
public class PasswordResetTokenService {

    @Autowired
    private PasswordResetTokenRepository passwordResetTokenRepository;
    @Autowired
    private UserRepository userRepository;

    public PasswordResetToken createRefreshToken(Long userId) {
        PasswordResetToken passToken = new PasswordResetToken();
        passToken.setUser(userRepository.findById(userId).get());
        passToken.setExpirationDate(Instant.now().plusMillis(12 * 60 * 60 * 1000));
        passToken.setToken(UUID.randomUUID().toString());
        passToken = passwordResetTokenRepository.save(passToken);
        return passToken;
    }

    public PasswordResetToken verifyExpiration(PasswordResetToken token) throws Exception{
        if (token.getExpirationDate().compareTo(Instant.now()) < 0) {
            passwordResetTokenRepository.delete(token);
            throw new Exception(token.getToken() + "Refresh token was expired. Please make a new signin request");
        }
        return token;
    }
}
