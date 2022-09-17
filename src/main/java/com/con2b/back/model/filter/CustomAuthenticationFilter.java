package com.con2b.back.model.filter;

import com.con2b.back.model.user.UserDetails2b;
import com.con2b.back.model.user.RefreshToken;
import com.con2b.back.service.user.RefreshTokenService;
import com.con2b.back.dto.user.UserDTO;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.context.ApplicationContext;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import javax.servlet.FilterChain;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import static com.con2b.back.util.JWTUtils.generateJwtToken;
import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;

public class CustomAuthenticationFilter extends UsernamePasswordAuthenticationFilter {

    RefreshTokenService refreshTokenService;
    private AuthenticationManager authenticationManager;

    public CustomAuthenticationFilter(AuthenticationManager authenticationManager, ApplicationContext ctx){
        this.authenticationManager = authenticationManager;
        this.refreshTokenService= ctx.getBean(RefreshTokenService.class);
    }

    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException {
        String email = request.getParameter("username");
        String password = request.getParameter("password");
        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(email, password);
        return authenticationManager.authenticate(authenticationToken);
    }

    @Override
    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain, Authentication authResult) throws IOException {
        UserDetails2b userDetails = (UserDetails2b) authResult.getPrincipal();
        String accessToken = generateJwtToken(userDetails,request.getRequestURL().toString());
        RefreshToken refreshTokenObject = refreshTokenService.createRefreshToken(userDetails.getAppUser().getId());
        String refreshToken = refreshTokenObject.getToken();
        Map<String,String> tokens = new HashMap<>();
        tokens.put("accessToken", accessToken);
        tokens.put("refreshToken", refreshToken);
        UserDTO user = new UserDTO(userDetails.getAppUser());
        Map<String,Object> res = new HashMap<>();
        res.put("user", user);
        res.put("tokens", tokens);
        res.put("ok", true);
        response.setContentType(APPLICATION_JSON_VALUE);
        new ObjectMapper().writeValue(response.getOutputStream(), res);
    }

}
