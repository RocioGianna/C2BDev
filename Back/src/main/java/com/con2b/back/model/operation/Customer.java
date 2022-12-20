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

    public void setAddress(String address) {
        billingAddress.setAddress(address);
    }

    public void setZipCode(String zipcode) {
        billingAddress.setZipcode(zipcode);
    }

    public void setMunicipality(String municipality) {
        billingAddress.setMunicipality(municipality);
    }

    public void setProvince(String province) {
        billingAddress.setProvince(province);
    }
}
