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
    private Long productOption;
    private Set<Long> availableAdditionals;
    private Set<OperationDetails>operationData;
    private Customer client;
    private InstallationAddress installationAddress;
    private SIMShippingAdress shippingAdress;
    private Set<Long> documentationId;

    public NewOperationDTO(String colaboratorCode, String colaboratorEmail, String colaboratorPhone, Long productOption, Set<Long> availableAdditionals, Set<OperationDetails> operationData, Customer client, InstallationAddress installationAddress, SIMShippingAdress shippingAdress, Set<Long> documentationId) {
        this.colaboratorCode = colaboratorCode;
        this.colaboratorEmail = colaboratorEmail;
        this.colaboratorPhone = colaboratorPhone;
        this.productOption = productOption;
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

    public Long getProductOption() {
        return productOption;
    }

    public void setProductOption(Long productOption) {
        this.productOption = productOption;
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

    public InstallationAddress getInstallationAddress() {
        return installationAddress;
    }

    public void setInstallationAddress(InstallationAddress installationAddress) {
        this.installationAddress = installationAddress;
    }

    public SIMShippingAdress getShippingAdress() {
        return shippingAdress;
    }

    public void setShippingAdress(SIMShippingAdress shippingAdress) {
        this.shippingAdress = shippingAdress;
    }

    public Set<Long> getDocumentationId() {
        return documentationId;
    }

    public void setDocumentationId(Set<Long> documentationId) {
        this.documentationId = documentationId;
    }



}
