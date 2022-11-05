package com.con2b.back.dto.operation;

import com.con2b.back.model.operation.*;
import com.con2b.back.model.product.AdditionalProduct;
import com.con2b.back.model.product.ProductOption;

import java.util.Date;
import java.util.Set;

public class NewOperationDTO {

    private String colaboratorCode;
    private String colaboratorEmail;
    private String colaboratorPhone;
    private Long productOptionId;
    private Set<Long> additionalIds;
    private Set<OperationDetails>operationDetails;
    private Customer customer;
    private Address installationAddress;
    private Address shippingAddress;
    private Set<Long> documentationId;

    public NewOperationDTO(String colaboratorCode, String colaboratorEmail, String colaboratorPhone, Long productOptionId, Set<Long> additionalIds, Set<OperationDetails> operationDetails, Customer customer, Address installationAddress, Address shippingAddress, Set<Long> documentationId) {
        this.colaboratorCode = colaboratorCode;
        this.colaboratorEmail = colaboratorEmail;
        this.colaboratorPhone = colaboratorPhone;
        this.productOptionId = productOptionId;
        this.additionalIds = additionalIds;
        this.operationDetails = operationDetails;
        this.customer = customer;
        this.installationAddress = installationAddress;
        this.shippingAddress = shippingAddress;
        this.documentationId = documentationId;
    }

    public String getColaboratorCode() {
        return colaboratorCode;
    }

    public void setColaboratorCode(String colaboratorCode) {
        this.colaboratorCode = colaboratorCode;
    }

    public String getColaboratorEmail() {
        return colaboratorEmail;
    }

    public void setColaboratorEmail(String colaboratorEmail) {
        this.colaboratorEmail = colaboratorEmail;
    }

    public String getColaboratorPhone() {
        return colaboratorPhone;
    }

    public void setColaboratorPhone(String colaboratorPhone) {
        this.colaboratorPhone = colaboratorPhone;
    }

    public Long getProductOptionId() {
        return productOptionId;
    }

    public void setProductOptionId(Long productOptionId) {
        this.productOptionId = productOptionId;
    }

    public Set<Long> getAdditionalIds() {
        return additionalIds;
    }

    public void setAdditionalIds(Set<Long> availableAdditionals) {
        this.additionalIds = availableAdditionals;
    }

    public Set<OperationDetails> getOperationDetails() {
        return operationDetails;
    }

    public void setOperationDetails(Set<OperationDetails> operationData) {
        this.operationDetails = operationData;
    }

    public Customer getCustomer() {
        return customer;
    }

    public void setCustomer(Customer client) {
        this.customer = client;
    }

    public Address getInstallationAddress() {
        return installationAddress;
    }

    public void setInstallationAddress(Address installationAddress) {
        this.installationAddress = installationAddress;
    }

    public Address getShippingAdress() {
        return shippingAddress;
    }

    public void setShippingAdress(Address shippingAdress) {
        this.shippingAddress = shippingAdress;
    }

    public Set<Long> getDocumentationId() {
        return documentationId;
    }

    public void setDocumentationId(Set<Long> documentationId) {
        this.documentationId = documentationId;
    }



}
