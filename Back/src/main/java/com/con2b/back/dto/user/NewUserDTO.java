package com.con2b.back.dto.user;

import com.con2b.back.model.operation.Address;
import com.con2b.back.model.product.Provider;
import com.con2b.back.model.user.Role;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.Set;

@Setter
@Getter
@AllArgsConstructor
public class NewUserDTO {
    private String userCode;
    private String email;
    private String firstName;
    private String lastName;
    private String nid;
    private String phone;
    private String bankAccount;
    private Address billingAddress;
    private Role role;
    private Set<Provider> allowedProviders;
}
