package com.con2b.back.dto.operation;

import com.con2b.back.model.operation.*;
import com.con2b.back.model.product.AdditionalProductOption;
import com.con2b.back.model.product.ProductOption;
import com.con2b.back.model.user.User2b;

import java.util.Date;
import java.util.Set;

public class FullOperationDTO {

    private Long id;
    private String operationCode;
    private Boolean reprocess;
    private Date creationDate;
    private Status status;
    private Channel channel;
    private User2b processor;
    private User2b colaborator;
    private String colaboratorEmail;
    private String colaboratorPhone;
    private ProductOption productOption;
    private Set<AdditionalProductOption> additionalProducts;
    private Set<OperationDetails>operationDetails;
    private Customer customer;
    private Address installationAddress;
    private Address shippingAdress;
    private Set<Documentation> documentation;

    public FullOperationDTO(Operation operation) {
        this.id = operation.getId();
        this.operationCode = operation.getOperationCode();
        this.reprocess = operation.getReprocess();
        this.creationDate = operation.getCreationDate();
        this.status = operation.getStatus();
        this.channel = operation.getChannel();
        this.processor = operation.getProcessor();
        this.colaborator = operation.getColaboratorCode();
        this.colaboratorEmail = operation.getColaboratorEmail();
        this.colaboratorPhone = operation.getColaboratorPhone();
        this.productOption = operation.getProductOption();
        this.additionalProducts = operation.getAdditionals();
        this.operationDetails = operation.getOperationData();
        this.customer = operation.getCustomer();
        this.installationAddress = operation.getInstallationAddress();
        this.shippingAdress = operation.getShippingAdress();
        this.documentation = operation.getDocumentation();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getOperationCode() {
        return operationCode;
    }

    public void setOperationCode(String operationCode) {
        this.operationCode = operationCode;
    }

    public Boolean getReprocess() {
        return reprocess;
    }

    public void setReprocess(Boolean reprocess) {
        this.reprocess = reprocess;
    }

    public Date getCreationDate() {
        return creationDate;
    }

    public void setCreationDate(Date creationDate) {
        this.creationDate = creationDate;
    }

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    public Channel getChannel() {
        return channel;
    }

    public void setChannel(Channel channel) {
        this.channel = channel;
    }

    public User2b getProcessor() {
        return processor;
    }

    public void setProcessor(User2b processor) {
        this.processor = processor;
    }

    public User2b getColaborator() {
        return colaborator;
    }

    public void setColaborator(User2b colaborator) {
        this.colaborator = colaborator;
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

    public ProductOption getProductOption() {
        return productOption;
    }

    public void setProductOption(ProductOption productOption) {
        this.productOption = productOption;
    }

    public Set<AdditionalProductOption> getAdditionalProducts() {
        return additionalProducts;
    }

    public void setAdditionalProducts(Set<AdditionalProductOption> additionalProducts) {
        this.additionalProducts = additionalProducts;
    }

    public Set<OperationDetails> getOperationDetails() {
        return operationDetails;
    }

    public void setOperationDetails(Set<OperationDetails> operationDetails) {
        this.operationDetails = operationDetails;
    }

    public Customer getCustomer() {
        return customer;
    }

    public void setCustomer(Customer customer) {
        this.customer = customer;
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

    public Set<Documentation> getDocumentation() {
        return documentation;
    }

    public void setDocumentation(Set<Documentation> documentation) {
        this.documentation = documentation;
    }
}
