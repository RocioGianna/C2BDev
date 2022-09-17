package com.con2b.back.resource.user;

import com.con2b.back.model.user.UserDetails2b;
import com.con2b.back.util.JWTUtils;
import com.con2b.back.service.user.RefreshTokenService;
import com.con2b.back.model.user.RefreshToken;
import com.con2b.back.dto.user.UserDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.Map;

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
            UserDetails2b userDetails = new UserDetails2b(refreshToken.getUser());
            String accessToken = JWTUtils.generateJwtToken(userDetails, request.getRequestURL().toString());
            UserDTO user = new UserDTO(userDetails.getAppUser());
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
