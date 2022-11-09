package com.con2b.back.resource.user;

import com.con2b.back.dto.GenericResponseDTO;
import com.con2b.back.service.user.UserService;
import com.con2b.back.model.user.User2b;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("api/v1")
@PreAuthorize("isAuthenticated()")
public class UserResource {

    @Autowired
    private UserService userService;

    @GetMapping("/users")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> getUsers() {
        return ResponseEntity.ok().body(new GenericResponseDTO(userService.getUsers()));
    }

    @GetMapping("/{userCode}")
    @PreAuthorize("hasRole('ADMIN') || hasRole('PROCESSOR')")
    public ResponseEntity<?> getUsersByUserCode(@PathVariable String userCode){
        return ResponseEntity.ok().body(new GenericResponseDTO(true, userService.getUsersByUserCode(userCode)));
    }

}
