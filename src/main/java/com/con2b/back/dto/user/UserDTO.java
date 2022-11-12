package com.con2b.back.dto.user;

import com.con2b.back.model.user.User2b;
import com.con2b.back.model.user.Role;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Setter
@Getter
public class UserDTO {

    private String userCode;
    private String email;
    private String firstname;
    private String lastname;
    private String phone;
    private List<Role> roles;

    public UserDTO(User2b user){
        this.userCode = user.getUserCode();
        this.email = user.getEmail();
        this.firstname = user.getFirstname();
        this.lastname = user.getLastname();
        this.phone = user.getPhone();
        this.roles = user.getRoles();
    }
}
