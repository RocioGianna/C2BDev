package com.con2b.back.resource.user;

import com.con2b.back.service.user.UserService;
import com.con2b.back.model.user.User2b;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
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
    public ResponseEntity<List<User2b>> getUsers() {
        return ResponseEntity.ok().body(userService.getUsers());
    }
}
