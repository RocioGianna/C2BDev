package com.example.demo.security;

import com.example.demo.security.jwt.RefreshToken;
import com.example.demo.security.jwt.RefreshTokenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.Map;
import java.util.stream.Collectors;

import static com.example.demo.security.jwt.JWTUtils.generateJwtToken;

@RestController
@RequestMapping(("/"))
@PreAuthorize("isAuthenticated()")
public class AuthResource {

    @Autowired
    RefreshTokenService refreshTokenService;

    @PostMapping("/refreshToken")
    @PreAuthorize("permitAll()")
    public ResponseEntity<?> refreshToken(HttpServletRequest request, @RequestParam String token) throws Exception{
        RefreshToken refreshToken = refreshTokenService.getByToken(token);
        if(refreshToken != null){
            refreshTokenService.verifyExpiration(refreshToken);
            CustomUserDetails userDetails = new CustomUserDetails(refreshToken.getUser());
            String accessToken = generateJwtToken(userDetails, request.getRequestURL().toString());
            Map<String,Object> user = new HashMap<>();
            user.put("email",userDetails.getAppUser().getEmail());
            user.put("roles", userDetails.getAuthorities().stream().map(GrantedAuthority::getAuthority).collect(Collectors.toList()));
            Map<String,Object> res = new HashMap<>();
            res.put("user", user);
            res.put("accessToken", accessToken);
            res.put("ok", true);
            return ResponseEntity.ok().body(res);
        } else {
            throw new Exception("Token not found, try logging in again");
        }
    }

    @PostMapping("/auth/logout")
    @PreAuthorize("permitAll()")
    public ResponseEntity<?> logout(@RequestParam String email){
        refreshTokenService.deleteByUserEmail(email);
        Map<String,Object> res = new HashMap<>();
        res.put("ok", true);
        return ResponseEntity.ok().body(res);
    }
}
