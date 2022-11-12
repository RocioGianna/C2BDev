package com.con2b.back.util;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.con2b.back.model.user.UserDetails2b;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.Date;
import java.util.stream.Collectors;

@Service
@NoArgsConstructor
public class JWTUtils {

    @Value("${security.jwt.duration}")
    private long tokenDuration;

    public String generateJwtToken(UserDetails2b userDetails, String issuer) {

        System.out.println("_____________________________");
        System.out.println("TOKEN DURATION " + tokenDuration);
        System.out.println("_____________________________");

        Algorithm algorithm = Algorithm.HMAC256("2bsecret".getBytes());
        String token = JWT.create()
                .withSubject(userDetails.getUsername())
                .withExpiresAt(new Date(System.currentTimeMillis() + tokenDuration ))
                .withIssuer(issuer)
                .withClaim("roles", userDetails.getAuthorities().stream().map(GrantedAuthority::getAuthority).collect(Collectors.toList()))
                .withClaim("userId", userDetails.getAppUser().getId())
                .sign(algorithm);
        return token;
    }
    public String getEmailFromJwtToken(String token){
        Algorithm algorithm = Algorithm.HMAC256("2bsecret".getBytes());
        JWTVerifier verifier = JWT.require(algorithm).build();
        DecodedJWT decodedJWT = verifier.verify(token);
        return decodedJWT.getSubject();
    }

    public String getUserIdFromJwtToken(String token){
        Algorithm algorithm = Algorithm.HMAC256("2bsecret".getBytes());
        JWTVerifier verifier = JWT.require(algorithm).build();
        DecodedJWT decodedJWT = verifier.verify(token);
        return decodedJWT.getClaim("userId").toString();
    }

    public Collection<GrantedAuthority> getAuthoritiesFromJwtToken(String token){
        Algorithm algorithm = Algorithm.HMAC256("2bsecret".getBytes());
        JWTVerifier verifier = JWT.require(algorithm).build();
        DecodedJWT decodedJWT = verifier.verify(token);
        String[] roles = decodedJWT.getClaim("roles").asArray(String.class);
        Collection<GrantedAuthority> authorities = new ArrayList<>();
        Arrays.stream(roles).forEach(role -> authorities.add(new SimpleGrantedAuthority(role)));
        return authorities;
    }
}
