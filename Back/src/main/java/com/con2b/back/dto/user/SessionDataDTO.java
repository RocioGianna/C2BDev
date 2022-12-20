package com.con2b.back.dto.user;

public class SessionDataDTO {

    private UserDTO user;
    private TokensDTO tokens;

    public SessionDataDTO(UserDTO user, TokensDTO tokens) {
        this.user = user;
        this.tokens = tokens;
    }

    public UserDTO getUser() {
        return user;
    }

    public void setUser(UserDTO user) {
        this.user = user;
    }

    public TokensDTO getTokens() {
        return tokens;
    }

    public void setTokens(TokensDTO tokens) {
        this.tokens = tokens;
    }
}
