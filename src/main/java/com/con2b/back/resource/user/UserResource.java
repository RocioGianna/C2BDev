package com.con2b.back.resource.user;

import com.con2b.back.dto.GenericResponseDTO;
import com.con2b.back.dto.user.*;
import com.con2b.back.dto.user.SmallUserDTO;
import com.con2b.back.model.user.User2b;
import com.con2b.back.service.user.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;
import java.util.stream.Collectors;


@RestController
@RequestMapping("api/v1/users")
@PreAuthorize("isAuthenticated()")
public class UserResource {

    @Autowired
    private UserService userService;

    @PostMapping("")
    @PreAuthorize("hasAnyRole('MANAGER', 'ADMIN', 'SUPER_ADMIN')")
    public ResponseEntity<?> createUser(@RequestBody NewUserDTO user){
        return ResponseEntity.ok().body(new GenericResponseDTO(true, userService.createUser(user)));
    }

    @PutMapping("/changePassword")
    public ResponseEntity<?> updatePassword(@RequestBody UserPasswordDTO pass, @RequestHeader("userId") Long userId){
        Optional<User2b> opUser = userService.getUserById(userId);
        try{
            return ResponseEntity.ok().body(new GenericResponseDTO(true, userService.changePassword(pass,opUser.get())));
        }catch(Exception e){
            return ResponseEntity.ok().body(new GenericResponseDTO(false,e.getMessage()));
        }
    }

    @PutMapping("/{userId}")
    @PreAuthorize("hasAnyRole('PROCESSOR')")
    public ResponseEntity<?> updateUser(@RequestBody ProcessorUserEditDTO newData, @PathVariable Long userId){
        Optional<User2b> opUser = userService.getUserById(userId);
        try{
            return ResponseEntity.ok().body(new GenericResponseDTO(true, userService.updateUser(newData, opUser.get())));
        }catch(Exception e){
            return ResponseEntity.ok().body(new GenericResponseDTO(false,"Collaborator code doesn't match with user code"));
        }
    }

    @PutMapping("/admin/{userId}")
    @PreAuthorize("hasAnyRole('ADMIN')")
    public ResponseEntity<?> updateUser(@RequestBody AdminUserEditDTO newData, @PathVariable Long userId){
        Optional<User2b> opUser = userService.getUserById(userId);
        try{
            return ResponseEntity.ok().body(new GenericResponseDTO(true, userService.updateUser(newData, opUser.get())));
        }catch(Exception e){
            return ResponseEntity.ok().body(new GenericResponseDTO(false,"Collaborator code doesn't match with user code"));
        }
    }

    @PutMapping("")
    @PreAuthorize("hasAnyRole('COLLABORATOR_ALL', 'COLLABORATOR_MOVISTAR')")
    public ResponseEntity<?> updateUser(@RequestBody UserEditDTO newData, @RequestHeader("userId") Long userId){
        Optional<User2b> opUser = userService.getUserById(userId);
        try{
            return ResponseEntity.ok().body(new GenericResponseDTO(true, userService.updateUser(newData, opUser.get())));
        }catch(Exception e){
            return ResponseEntity.ok().body(new GenericResponseDTO(false,"Collaborator code doesn't match with user code"));
        }
    }

    @GetMapping("/list")
    @PreAuthorize("hasAnyRole('PROCESSOR','PROCESSOR_ADVANCED', 'MANAGER', 'ADMIN', 'SUPER_ADMIN')")
    public ResponseEntity<?> getAllUsers(){
        return ResponseEntity.ok().body(new GenericResponseDTO(true, userService.gerAllUsers().stream().map(UserDTO::new).collect(Collectors.toList())));
    }

    @GetMapping("")
    @PreAuthorize("hasAnyRole('PROCESSOR','PROCESSOR_ADVANCED', 'MANAGER', 'ADMIN', 'SUPER_ADMIN')")
    public ResponseEntity<?> getUsersByUserCode(@RequestParam(defaultValue = "") String userCode ){
        return ResponseEntity.ok().body(new GenericResponseDTO(true, userService.getUsersByUserCode(userCode).stream().map(SmallUserDTO::new).collect(Collectors.toList())));
    }

    @GetMapping("/processors")
    @PreAuthorize("hasAnyRole('PROCESSOR','PROCESSOR_ADVANCED', 'MANAGER', 'ADMIN', 'SUPER_ADMIN')")
    public ResponseEntity<?> getProcessorsByUserCode(@RequestParam(defaultValue = "") String processorCode ){
        return ResponseEntity.ok().body(new GenericResponseDTO(true, userService.getProcessorsByUserCode(processorCode).stream().map(SmallUserDTO::new).collect(Collectors.toList())));
    }

    @PostMapping("/recoverPassword")
    public ResponseEntity recoverPassword(@RequestBody String email){
        User2b user = userService.getUserByEmail(email);
        if( user != null){
            return ResponseEntity.ok(new GenericResponseDTO(true, userService.getPasswordResetToken(user)));
        }
        return ResponseEntity.ok().body(new GenericResponseDTO(false, "email doesn't exist"));
    }
}
