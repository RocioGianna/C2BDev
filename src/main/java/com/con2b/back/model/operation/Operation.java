package com.con2b.back.model.operation;

import com.con2b.back.model.product.AdditionalProduct;
import org.hibernate.annotations.CreationTimestamp;
import org.springframework.data.annotation.Id;


import javax.persistence.*;
import java.util.Date;
import java.util.List;

public class Operation {

    @Id @GeneratedValue
    private Long id;

    private String operationCode;

    @CreationTimestamp
    @Temporal(TemporalType.TIMESTAMP)
    private Date creationDate;

    private Status status;

    private Channel channel;

    private Long processorId;

    private Long colaboratorCode;

    @Column(nullable = true)
    private String colaboratorEmail;

    @Column(nullable = true)
    private String colaboratorPhone;

    @ManyToOne(fetch = FetchType.EAGER)
    private Long productOptionId;

    @ManyToMany(fetch = FetchType.EAGER)
    private List<AdditionalProduct> additionalIds;

    //private List<>operationData;
    //private List<>client;


    public Operation(Long id, String operationCode, Date creationDate, Status status, Channel channel, Long processorId,
                     Long colaboratorCode, String colaboratorEmail, String colaboratorPhone, Long productOptionId, List<AdditionalProduct> additionalIds) {
        this.id = id;
        this.operationCode = operationCode;
        this.creationDate = creationDate;
        this.status = status;
        this.channel = channel;
        this.processorId = processorId;
        this.colaboratorCode = colaboratorCode;
        this.colaboratorEmail = colaboratorEmail;
        this.colaboratorPhone = colaboratorPhone;
        this.productOptionId = productOptionId;
        this.additionalIds = additionalIds;
    }

    public Long getId(){ return id; }
    public String getOperationCode(){ return operationCode; }
    public void setOperationCode(String operationCode){ this.operationCode = operationCode; }
    public Date getCreationDate(){ return creationDate; }
    public void setCreationDate(Date creationDate){ this.creationDate = creationDate; }
    public Status getStatus(){ return status; }
    public void setStatus(Status status){ this.status = status; }
    public Channel getChannel(){ return channel; }
    public void setChannel(Channel channel){ this.channel = channel; }
    public Long getProcessorId(){ return processorId; }
    public void setProcessorId(Long processorId){ this.processorId = processorId; }
    public Long getColaboratorCode(){ return colaboratorCode; }
    public void setColaboratorCode(Long colaboratorCode){ this.colaboratorCode = colaboratorCode; }
    public String getColaboratorEmail(){ return colaboratorEmail; }
    public void setColaboratorEmail(String colaboratorEmail){ this.colaboratorCode = colaboratorCode; }
    public String getColaboratorPhone(){ return colaboratorPhone; }
    public void setColaboratorPhone(String colaboratorPhone){ this.colaboratorPhone = colaboratorPhone; }
    public Long getProductOptionId(){ return productOptionId; }
    public void setProductOptionId(Long productOptionId){ this.productOptionId = productOptionId; }
    public void addRole(AdditionalProduct additionalId) {
        this.additionalIds.add(additionalId);
    }
    public void setRoles(List<AdditionalProduct> additionals) { this.additionalIds = additionals; }

}
