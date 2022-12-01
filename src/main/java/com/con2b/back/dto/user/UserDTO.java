package com.con2b.back.dto.user;

import com.con2b.back.model.operation.Address;
import com.con2b.back.model.user.User2b;
import com.con2b.back.model.user.Role;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.FetchType;
import javax.persistence.OneToOne;
import java.util.List;

@Setter
@Getter
@AllArgsConstructor
public class UserDTO {

    private String userCode;
    private String email;
    private String firstname;
    private String lastname;
    private String phone;
    private String nid;
    private String bankAccount;
    private String refererCode;
    private Address billingAddress;
    private Role role;

    public UserDTO(User2b user){
        this.userCode = user.getUserCode();
        this.email = user.getEmail();
        this.firstname = user.getFirstname();
        this.lastname = user.getLastname();
        this.phone = user.getPhone();
        this.nid = user.getNid();
        this.bankAccount = user.getBankAccount();
        this.refererCode = user.getRefererCode();
        this.billingAddress = user.getBillingAddress();
        this.role = user.getRole();
    }
}
