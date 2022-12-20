package com.con2b.back.resource.user;

import com.con2b.back.dto.GenericResponseDTO;
import com.con2b.back.dto.user.SessionDataDTO;
import com.con2b.back.dto.user.TokensDTO;
import com.con2b.back.model.user.User2b;
import com.con2b.back.model.user.UserDetails2b;
import com.con2b.back.service.user.UserService;
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
import java.util.Optional;

@RestController
@RequestMapping(("/"))
@PreAuthorize("isAuthenticated()")
public class AuthResource {

    @Autowired
    private RefreshTokenService refreshTokenService;
    @Autowired
    private UserService userService;
    @Autowired
    private JWTUtils jwtUtils;

    @PostMapping("/refreshToken")
    @PreAuthorize("permitAll()")
    public ResponseEntity<?> refreshToken(HttpServletRequest request, @RequestParam String token) throws Exception{
        RefreshToken refreshToken = refreshTokenService.getByToken(token);
        if(refreshToken != null){
            refreshTokenService.verifyExpiration(refreshToken);
            UserDetails2b userDetails = new UserDetails2b(refreshToken.getUser());
            String accessToken = jwtUtils.generateJwtToken(userDetails, request.getRequestURL().toString());
            UserDTO user = new UserDTO(userDetails.getAppUser());
            GenericResponseDTO<SessionDataDTO> res = new GenericResponseDTO<>(new SessionDataDTO(user,new TokensDTO(accessToken)));
            return ResponseEntity.ok().body(res);
        } else {
            throw new Exception("Token not found, try logging in again");
        }
    }

    @PostMapping("/auth/logout")
    public ResponseEntity<?> logout(@RequestHeader("userId") Long userId){
        Optional<User2b> userOpt = userService.getUserById(userId);
        if(userOpt.isPresent()){
            refreshTokenService.deleteByUserEmail(userOpt.get().getEmail());
            return ResponseEntity.ok().body(new GenericResponseDTO<>("User with userId: "+userId+" logged out"));
        } else {
            return ResponseEntity.ok().body(new GenericResponseDTO(false,"Failed to log out, userId: "+userId+" not found"));
        }
    }
}
