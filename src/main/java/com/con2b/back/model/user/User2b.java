package com.con2b.back.model.user;

import com.con2b.back.model.operation.Address;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class User2b {
    @Id @GeneratedValue
    private Long id;
    private String email;
    private String password;
    private String firstname;
    private String lastname;
    private String userCode;
    private String phone;
    private boolean enabled;
    private String nid;
    private String bankAccount;
    private String refererCode;
    @OneToOne(fetch = FetchType.EAGER)
    private Address billingAddress;
    private Role role;
}
