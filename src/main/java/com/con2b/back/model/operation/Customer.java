package com.con2b.back.model.operation;

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
public class Customer {
    @Id
    @GeneratedValue
    private Long id;
    private String firstName;
    private String lastName;
    private String nid;
    private String phone;
    private String email;
    private String bankAccount;
    @OneToOne(fetch = FetchType.EAGER)
    private Address billingAddress;


}
