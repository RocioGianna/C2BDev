package com.con2b.back.dto.user;

import com.con2b.back.model.operation.Address;
import com.con2b.back.model.product.Provider;
import com.con2b.back.model.user.User2b;
import com.con2b.back.model.user.Role;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;


import java.util.Set;
import java.util.stream.Collectors;

@Setter
@Getter
@AllArgsConstructor
public class UserDTO {

    private String userCode;
    private String email;
    private String firstName;
    private String lastName;
    private String nid;
    private String phone;
    private String bankAccount;
    private Address billingAddress;
    private Role role;
    private Set<String> allowedProviders;

    public UserDTO(User2b user){
        this.userCode = user.getUserCode();
        this.email = user.getEmail();
        this.firstName = user.getFirstName();
        this.lastName = user.getLastName();
        this.nid = user.getNid();
        this.phone = user.getPhone();
        this.bankAccount = user.getBankAccount();
        this.billingAddress = user.getBillingAddress();
        this.role = user.getRole();
        this.allowedProviders = user.getAllowedProviders().stream().map(Provider::getName).collect(Collectors.toSet());
    }
}
