package com.con2b.back.model.operation;

import com.con2b.back.model.product.AdditionalProduct;
import com.con2b.back.model.product.ProductOption;
import org.hibernate.annotations.CreationTimestamp;
import org.springframework.data.annotation.Id;


import javax.persistence.*;
import java.util.Date;
import java.util.List;
@Entity
public class Operation {

    @Id @GeneratedValue
    private Long id;

    private String operationCode;

    @CreationTimestamp
    @Temporal(TemporalType.TIMESTAMP)
    private Date creationDate;

    private Status status;
    @Column(nullable = true)
    private Channel channel;
    @Column(nullable = true)
    private Long processorId;

    private Long colaboratorCode;

    @Column(nullable = true)
    private String colaboratorEmail;

    @Column(nullable = true)
    private String colaboratorPhone;

    @ManyToOne(fetch = FetchType.LAZY)
    private ProductOption productOption;

    @ManyToMany(fetch = FetchType.LAZY)
    private List<AdditionalProduct> additionalIds;

    private List<OperationDetails>operationData;

    private Customer client;

    @Column(nullable = true)
    private InstallationAddress installationAddress;

    @Column(nullable = true)
    private SIMShippingAdress shippingAdress;

    @OneToMany(fetch = FetchType.LAZY)
    private List<Documentation> documentationId;

    public Operation(Long id, String operationCode, Date creationDate, Status status, Channel channel, Long processorId,
                     Long colaboratorCode, String colaboratorEmail, String colaboratorPhone, ProductOption productOption,
                     List<AdditionalProduct> additionalIds, List<OperationDetails> operationData, Customer client,
                     InstallationAddress installationAddress, SIMShippingAdress shippingAdress, List<Documentation> documentationId) {
        this.id = id;
        this.operationCode = operationCode;
        this.creationDate = creationDate;
        this.status = status;
        this.channel = channel;
        this.processorId = processorId;
        this.colaboratorCode = colaboratorCode;
        this.colaboratorEmail = colaboratorEmail;
        this.colaboratorPhone = colaboratorPhone;
        this.productOption = productOption;
        this.additionalIds = additionalIds;
        this.operationData = operationData;
        this.client = client;
        this.installationAddress = installationAddress;
        this.shippingAdress = shippingAdress;
        this.documentationId = documentationId;
    }

    public Long getId(){
        return id;
    }
    public String getOperationCode(){
        return operationCode;
    }
    public void setOperationCode(String operationCode){
        this.operationCode = operationCode;
    }
    public Date getCreationDate(){
        return creationDate;
    }
    public void setCreationDate(Date creationDate){
        this.creationDate = creationDate;
    }
    public Status getStatus(){
        return status;
    }
    public void setStatus(Status status){
        this.status = status;
    }
    public Channel getChannel(){
        return channel;
    }
    public void setChannel(Channel channel){
        this.channel = channel;
    }
    public Long getProcessorId(){
        return processorId;
    }
    public void setProcessorId(Long processorId){
        this.processorId = processorId;
    }
    public Long getColaboratorCode(){
        return colaboratorCode;
    }
    public void setColaboratorCode(Long colaboratorCode){
        this.colaboratorCode = colaboratorCode;
    }
    public String getColaboratorEmail(){
        return colaboratorEmail;
    }
    public void setColaboratorEmail(String colaboratorEmail){
        this.colaboratorCode = colaboratorCode;
    }
    public String getColaboratorPhone(){
        return colaboratorPhone;
    }
    public void setColaboratorPhone(String colaboratorPhone){
        this.colaboratorPhone = colaboratorPhone;
    }
    public ProductOption getProductOptionId(){ return productOption; }
    public void setProductOptionId(ProductOption productOptionId){
        this.productOption = productOptionId;
    }
    public void addRole(AdditionalProduct additionalId) {
        this.additionalIds.add(additionalId);
    }
    public void setRoles(List<AdditionalProduct> additionals) {
        this.additionalIds = additionals;
    }
    public void addOperationDetails(OperationDetails operationDetails){
        this.operationData.add(operationDetails);
    }
    public void setOperationDetails(List<OperationDetails> operationDetails){
        this.operationData = operationDetails;
    }
    public Customer getClient() { return client; }
    public void setClient(Customer customer){
        this.client = customer;
    }
    public InstallationAddress getInstallationAddress(InstallationAddress installationAddress){
        return installationAddress;
    }
    public void setInstallationAddress(InstallationAddress installationAddress){
        this.operationData = operationData;
    }
    public SIMShippingAdress getShippingAdress(SIMShippingAdress shippingAdress){
        return shippingAdress;
    }
    public void setShippingAdress(SIMShippingAdress shippingAdress){
        this.shippingAdress = shippingAdress;
    }
    public void addDocumentation(Documentation documentationId){
        this.documentationId.add(documentationId);
    }
    public void setDocumentationId(List<Documentation> documentationId){
        this.documentationId = documentationId;
    }

}
