package com.con2b.back.model.operation;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToOne;

@Entity
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
    @OneToOne
    private Address billingAddress;

    public Customer(){}
    public Customer(Long id, String firstName, String lastName, String nid, String phone, String email, String bankAccount, Address billingAddress) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.nid = nid;
        this.phone = phone;
        this.email = email;
        this.bankAccount =bankAccount;
        this.billingAddress = billingAddress;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getNID() {
        return nid;
    }

    public void setNID(String NID) {
        this.nid = NID;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getBankAccount() {
        return bankAccount;
    }

    public void setBankAccount(String bankAccount) {
        this.bankAccount = bankAccount;
    }

    public Address getAddress() {
        return billingAddress;
    }

    public void setAddress(Address billingAddress) {
        this.billingAddress = billingAddress;
    }
}
