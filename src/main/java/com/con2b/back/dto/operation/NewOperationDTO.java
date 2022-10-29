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
    private Set<Long> availableAdditionals;
    private Set<OperationDetails>operationData;
    private Customer client;
    private Address installationAddress;
    private Address shippingAdress;
    private Set<Long> documentationId;

    public NewOperationDTO(String colaboratorCode, String colaboratorEmail, String colaboratorPhone, Long productOptionId, Set<Long> availableAdditionals, Set<OperationDetails> operationData, Customer client, Address installationAddress, Address shippingAdress, Set<Long> documentationId) {
        this.colaboratorCode = colaboratorCode;
        this.colaboratorEmail = colaboratorEmail;
        this.colaboratorPhone = colaboratorPhone;
        this.productOptionId = productOptionId;
        this.availableAdditionals = availableAdditionals;
        this.operationData = operationData;
        this.client = client;
        this.installationAddress = installationAddress;
        this.shippingAdress = shippingAdress;
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

    public Set<Long> getAvailableAdditionals() {
        return availableAdditionals;
    }

    public void setAvailableAdditionals(Set<Long> availableAdditionals) {
        this.availableAdditionals = availableAdditionals;
    }

    public Set<OperationDetails> getOperationData() {
        return operationData;
    }

    public void setOperationData(Set<OperationDetails> operationData) {
        this.operationData = operationData;
    }

    public Customer getClient() {
        return client;
    }

    public void setClient(Customer client) {
        this.client = client;
    }

    public Address getInstallationAddress() {
        return installationAddress;
    }

    public void setInstallationAddress(Address installationAddress) {
        this.installationAddress = installationAddress;
    }

    public Address getShippingAdress() {
        return shippingAdress;
    }

    public void setShippingAdress(Address shippingAdress) {
        this.shippingAdress = shippingAdress;
    }

    public Set<Long> getDocumentationId() {
        return documentationId;
    }

    public void setDocumentationId(Set<Long> documentationId) {
        this.documentationId = documentationId;
    }



}
