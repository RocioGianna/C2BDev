package com.con2b.back.util;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.con2b.back.model.user.UserDetails2b;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.Date;
import java.util.stream.Collectors;

public class JWTUtils {
    public static String generateJwtToken(UserDetails2b userDetails, String issuer) {
        Algorithm algorithm = Algorithm.HMAC256("2bsecret".getBytes());
        String token = JWT.create()
                .withSubject(userDetails.getUsername())
                .withExpiresAt(new Date(System.currentTimeMillis() + 60 * 1000))
                .withIssuer(issuer)
                .withClaim("roles", userDetails.getAuthorities().stream().map(GrantedAuthority::getAuthority).collect(Collectors.toList()))
                .withClaim("userId", userDetails.getAppUser().getId())
                .sign(algorithm);
        return token;
    }
    public static String getEmailFromJwtToken(String token){
        Algorithm algorithm = Algorithm.HMAC256("2bsecret".getBytes());
        JWTVerifier verifier = JWT.require(algorithm).build();
        DecodedJWT decodedJWT = verifier.verify(token);
        return decodedJWT.getSubject();
    }

    public static String getUserIdFromJwtToken(String token){
        Algorithm algorithm = Algorithm.HMAC256("2bsecret".getBytes());
        JWTVerifier verifier = JWT.require(algorithm).build();
        DecodedJWT decodedJWT = verifier.verify(token);
        return decodedJWT.getClaim("userId").toString();
    }

    public static Collection<GrantedAuthority> getAuthoritiesFromJwtToken(String token){
        Algorithm algorithm = Algorithm.HMAC256("2bsecret".getBytes());
        JWTVerifier verifier = JWT.require(algorithm).build();
        DecodedJWT decodedJWT = verifier.verify(token);
        String[] roles = decodedJWT.getClaim("roles").asArray(String.class);
        Collection<GrantedAuthority> authorities = new ArrayList<>();
        Arrays.stream(roles).forEach(role -> authorities.add(new SimpleGrantedAuthority(role)));
        return authorities;
    }
}
