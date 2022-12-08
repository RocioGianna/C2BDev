package com.con2b.back.dto.user;

import com.con2b.back.model.product.Provider;
import com.con2b.back.model.user.User2b;
import com.con2b.back.model.user.Role;
import lombok.Getter;
import lombok.Setter;

import java.util.Set;
import java.util.stream.Collectors;

@Setter
@Getter
public class UserDTO {

    private String userCode;
    private String email;
    private String firstName;
    private String lastName;
    private String phone;
    private Role role;
    private Set<String> allowedProviders;


    public UserDTO(User2b user){
        this.userCode = user.getUserCode();
        this.email = user.getEmail();
        this.firstName = user.getFirstname();
        this.lastName = user.getLastname();
        this.phone = user.getPhone();
        this.role = user.getRole();
        this.allowedProviders = user.getAllowedProviders().stream().map(Provider::getName).collect(Collectors.toSet());
    }
}
