package com.con2b.back.model.operation;

import com.con2b.back.model.product.AdditionalProductOption;
import com.con2b.back.model.product.ProductOption;

import javax.persistence.*;

@Entity
public class OperationDetails {

    @Id
    @GeneratedValue
    private Long id;
    @ManyToOne
    private ProductOption productOption;
    @ManyToOne
    private AdditionalProductOption additionalProductOption;
    private OperationDetailsType type;
    @Column(nullable = true)
    private String phone;
    @Column(nullable = true)
    private String currentProvider;
    @Column(nullable = true)
    private String  currentOwnerFirstname;
    @Column(nullable = true)
    private String currentOwnerLastname;
    @Column(nullable = true)
    private String currentOwnerNID;

    public OperationDetails() {
    }

    public OperationDetails(Long id, ProductOption option, AdditionalProductOption additionalProductOption, OperationDetailsType type, String phone, String currentProvider, String currentOwnerFirstname, String currentOwnerLastname, String currentOwnerNID) {
        this.id = id;
        this.productOption = option;
        this.additionalProductOption =additionalProductOption;
        this.type = type;
        this.phone = phone;
        this.currentProvider = currentProvider;
        this.currentOwnerFirstname = currentOwnerFirstname;
        this.currentOwnerLastname = currentOwnerLastname;
        this.currentOwnerNID = currentOwnerNID;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public ProductOption getOption() {
        return productOption;
    }

    public void setOption(ProductOption optionId) {
        this.productOption = optionId;
    }

    public AdditionalProductOption getAdditionalProductOption() {
        return additionalProductOption;
    }

    public void setAdditionalProductOption(AdditionalProductOption additionalProductOption) {
        this.additionalProductOption = additionalProductOption;
    }

    public OperationDetailsType getType() {
        return type;
    }

    public void setType(OperationDetailsType type) {
        this.type = type;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getCurrentProvider() {
        return currentProvider;
    }

    public void setCurrentProvider(String currentProvider) {
        this.currentProvider = currentProvider;
    }

    public String getCurrentOwnerFirstname() {
        return currentOwnerFirstname;
    }

    public void setCurrentOwnerFirstname(String currentOwnerFirstname) {
        this.currentOwnerFirstname = currentOwnerFirstname;
    }

    public String getCurrentOwnerLastname() {
        return currentOwnerLastname;
    }

    public void setCurrentOwnerLastname(String currentOwnerLastname) {
        this.currentOwnerLastname = currentOwnerLastname;
    }

    public String getCurrentOwnerNID() {
        return currentOwnerNID;
    }

    public void setCurrentOwnerNID(String currentOwnerNID) {
        this.currentOwnerNID = currentOwnerNID;
    }
}
