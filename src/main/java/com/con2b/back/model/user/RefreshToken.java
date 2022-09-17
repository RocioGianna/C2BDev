package com.con2b.back.model.user;

import com.con2b.back.model.user.User2b;

import javax.persistence.*;
import java.time.Instant;

@Entity
public class RefreshToken {

    @Id @GeneratedValue
    private Long id;

    private String token;
    @OneToOne
    private User2b user;

    private Instant expirationDate;

    public RefreshToken() {}

    public RefreshToken(Long id, String token, User2b user, Instant expirationDate) {
        this.id = id;
        this.token = token;
        this.user = user;
        this.expirationDate = expirationDate;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public User2b getUser() {
        return user;
    }

    public void setUser(User2b user) {
        this.user = user;
    }

    public Instant getExpirationDate() {
        return expirationDate;
    }

    public void setExpirationDate(Instant expirationDate) {
        this.expirationDate = expirationDate;
    }
}
