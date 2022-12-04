package com.con2b.back.dto.user;

import com.con2b.back.model.user.User2b;
import com.con2b.back.model.user.Role;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class UserDTO {

    private String userCode;
    private String email;
    private String firstName;
    private String lastName;
    private String phone;
    private Role role;

    public UserDTO(User2b user){
        this.userCode = user.getUserCode();
        this.email = user.getEmail();
        this.firstName = user.getFirstname();
        this.lastName = user.getLastname();
        this.phone = user.getPhone();
        this.role = user.getRole();
    }
}
