package com.con2b.back.dto.user;

import com.con2b.back.model.operation.Address;
import com.con2b.back.model.user.Role;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
public class NewUserDTO {
    private String userCode;
    private String email;
    private String firstname;
    private String lastname;
    private String phone;
    private Role role;
    private Address address;
    private String refererCode;
    private String banckAcount;
    private String nid;
}
