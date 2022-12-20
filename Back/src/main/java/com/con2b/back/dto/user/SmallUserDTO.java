package com.con2b.back.dto.user;

import com.con2b.back.model.user.User2b;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class SmallUserDTO {
    private String userCode;
    private String firstName;
    private String lastName;

    public SmallUserDTO(User2b user){
        this.userCode = user.getUserCode();
        this.firstName = user.getFirstName();
        this.lastName = user.getLastName();
    }
}
