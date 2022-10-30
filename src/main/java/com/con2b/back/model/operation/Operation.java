package com.con2b.back.model.operation;

import com.con2b.back.model.product.AdditionalProduct;
import com.con2b.back.model.product.AdditionalProductOption;
import com.con2b.back.model.product.ProductOption;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.util.Date;
import java.util.Set;

@Entity
public class Operation {

    @Id @GeneratedValue
    private Long id;

    private String operationCode;
    private Boolean reprocess;
    @CreationTimestamp
    @Temporal(TemporalType.TIMESTAMP)
    private Date creationDate;

    private Status status;
    @Column(nullable = true)
    private Channel channel;
    @Column(nullable = true)
    private Long processorId;

    private String colaboratorCode;

    @Column(nullable = true)
    private String colaboratorEmail;

    @Column(nullable = true)
    private String colaboratorPhone;

    @ManyToOne(fetch = FetchType.LAZY)
    private ProductOption productOption;

    @ManyToMany(fetch = FetchType.LAZY)
    private Set<AdditionalProductOption> additionalProducts;

    @OneToMany
    private Set<OperationDetails>operationDetails;

    @OneToOne
    private Customer customer;

    @OneToOne
    private Address installationAddress;

    @OneToOne
    private Address shippingAdress;

    @OneToMany(fetch = FetchType.LAZY)
    private Set<Documentation> documentation;

    public Operation(){};

    public Operation(Long id, String operationCode,Boolean reprocess, Date creationDate, Status status, Channel channel, Long processorId,
                     String colaboratorCode, String colaboratorEmail, String colaboratorPhone, ProductOption productOption,
                     Set<AdditionalProductOption> additionalIds, Set<OperationDetails> operationDetails, Customer customer,
                     Address installationAddress, Address shippingAdress, Set<Documentation> documentationId) {

        this.id = id;
        this.operationCode = operationCode;
        this.reprocess = reprocess;
        this.creationDate = creationDate;
        this.status = status;
        this.channel = channel;
        this.processorId = processorId;
        this.colaboratorCode = colaboratorCode;
        this.colaboratorEmail = colaboratorEmail;
        this.colaboratorPhone = colaboratorPhone;
        this.productOption = productOption;
        this.additionalProducts = additionalIds;
        this.operationDetails = operationDetails;
        this.customer = customer;
        this.installationAddress = installationAddress;
        this.shippingAdress = shippingAdress;
        this.documentation = documentationId;
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

    public Boolean getReprocess() {
        return reprocess;
    }

    public void setReprocess(Boolean reprocess) {
        this.reprocess = reprocess;
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
    public String getColaboratorCode(){
        return colaboratorCode;
    }
    public void setColaboratorCode(String colaboratorCode){
        this.colaboratorCode = colaboratorCode;
    }
    public String getColaboratorEmail(){
        return colaboratorEmail;
    }
    public void setColaboratorEmail(String colaboratorEmail){
        this.colaboratorEmail = colaboratorEmail;
    }
    public String getColaboratorPhone(){
        return colaboratorPhone;
    }
    public void setColaboratorPhone(String colaboratorPhone){
        this.colaboratorPhone = colaboratorPhone;
    }
    public ProductOption getProductOption(){ return productOption; }
    public void setProductOption(ProductOption productOptionId){
        this.productOption = productOptionId;
    }
    public void addAdditionals(AdditionalProductOption additionalId) {
        this.additionalProducts.add(additionalId);
    }
    public Set<AdditionalProductOption> getAdditionals() {
        return additionalProducts;
    }
    public void setAdditionals(Set<AdditionalProductOption> additionals) {
        this.additionalProducts = additionals;
    }
    public void addOperationDetails(OperationDetails operationDetails){
        this.operationDetails.add(operationDetails);
    }
    public void setOperationDetails(Set<OperationDetails> operationDetails){
        this.operationDetails = operationDetails;
    }
    public Set<OperationDetails> getOperationData() {
        return operationDetails;
    }
    public Customer getCustomer() { return customer; }
    public void setCustomer(Customer customer){
        this.customer = customer;
    }

    public Address getInstallationAddress(){
        return installationAddress;
    }
    public void setInstallationAddress(Address installationAddress){
        this.installationAddress = installationAddress;
    }

    public Address getShippingAdress(){
        return shippingAdress;
    }
    public void setShippingAdress(Address shippingAdress){
        this.shippingAdress = shippingAdress;
    }
    public void addDocumentation(Documentation documentationId){
        this.documentation.add(documentationId);
    }
    public void setDocumentation(Set<Documentation> documentationId){
        this.documentation = documentationId;
    }
    public Set<Documentation> getDocumentation() {
        return documentation;
    }

}
