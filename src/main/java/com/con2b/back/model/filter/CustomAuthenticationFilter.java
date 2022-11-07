package com.con2b.back.model.filter;

import com.con2b.back.dto.GenericResponseDTO;
import com.con2b.back.dto.user.SessionDataDTO;
import com.con2b.back.dto.user.TokensDTO;
import com.con2b.back.model.user.UserDetails2b;
import com.con2b.back.model.user.RefreshToken;
import com.con2b.back.service.user.RefreshTokenService;
import com.con2b.back.dto.user.UserDTO;
import com.con2b.back.util.JWTUtils;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
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
import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;

public class CustomAuthenticationFilter extends UsernamePasswordAuthenticationFilter {

    private RefreshTokenService refreshTokenService;
    private AuthenticationManager authenticationManager;
    private JWTUtils jwtUtils;

    public CustomAuthenticationFilter(AuthenticationManager authenticationManager, ApplicationContext ctx){
        this.authenticationManager = authenticationManager;
        this.refreshTokenService= ctx.getBean(RefreshTokenService.class);
        this.jwtUtils = ctx.getBean(JWTUtils.class);
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
        String accessToken = jwtUtils.generateJwtToken(userDetails,request.getRequestURL().toString());
        RefreshToken refreshTokenObject = refreshTokenService.createRefreshToken(userDetails.getAppUser().getId());
        String refreshToken = refreshTokenObject.getToken();
        UserDTO user = new UserDTO(userDetails.getAppUser());
        GenericResponseDTO<SessionDataDTO> res = new GenericResponseDTO<>(new SessionDataDTO(user,new TokensDTO(accessToken,refreshToken)));
        response.setContentType(APPLICATION_JSON_VALUE);
        new ObjectMapper().writeValue(response.getOutputStream(), res);
    }

}
