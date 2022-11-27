package com.con2b.back.resource.user;

import com.con2b.back.dto.GenericResponseDTO;
import com.con2b.back.dto.user.SmallUserDTO;
import com.con2b.back.service.user.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.properties.bind.DefaultValue;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.stream.Collectors;


@RestController
@RequestMapping("api/v1/users")
@PreAuthorize("isAuthenticated()")
public class UserResource {

    @Autowired
    private UserService userService;

    @GetMapping("")
    @PreAuthorize("hasAnyRole('PROCESSOR','PROCESSOR_ADVANCED', 'MANAGER', 'ADMIN', 'SUPER_ADMIN')")
    public ResponseEntity<?> getUsersByUserCode(@RequestParam(defaultValue = "") String userCode ){
        return ResponseEntity.ok().body(new GenericResponseDTO(true, userService.getUsersByUserCode(userCode).stream().map(SmallUserDTO::new).collect(Collectors.toList())));
    }

}
