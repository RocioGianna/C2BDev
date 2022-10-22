package com.con2b.back.model.operation;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class SIMShippingAdress {
    @Id
    @GeneratedValue
    private Long id;
    private String address;
    private String zipCode;
    private String municipality;
    private String province;

    public SIMShippingAdress(Long id, String address, String zipCode, String municipality, String province) {
        this.id = id;
        this.address = address;
        this.zipCode = zipCode;
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

    public String getZipCode() {
        return zipCode;
    }

    public void setZipCode(String zipCode) {
        this.zipCode = zipCode;
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
