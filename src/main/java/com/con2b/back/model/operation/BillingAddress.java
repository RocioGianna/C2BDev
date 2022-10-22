package com.con2b.back.model.operation;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class BillingAddress {

    @Id
    @GeneratedValue
    private Long id;
    private String address;
    private String zipcode;
    private String municipality;
    private String province;


    public BillingAddress(Long id, String address, String zipcode, String municipality, String province) {
        this.id = id;
        this.address = address;
        this.zipcode = zipcode;
        this.municipality = municipality;
        this.province = province;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getZipcode() {
        return zipcode;
    }

    public void setZipcode(String zipcode) {
        this.zipcode = zipcode;
    }

    public String getMunicipality() {
        return municipality;
    }

    public void setMunicipality(String municipality) {
        this.municipality = municipality;
    }

    public String getProvince() {
        return province;
    }

    public void setProvince(String province) {
        this.province = province;
    }
}
