package com.con2b.back.dto.operation;

import com.con2b.back.model.operation.*;
import com.con2b.back.model.product.AdditionalProductOption;
import com.con2b.back.model.product.ProductOption;
import com.con2b.back.model.user.User2b;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;
import java.util.List;
import java.util.Set;

@Getter
@Setter
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
    private List<AdditionalProductOption> additionalProducts;
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
        this.colaborator = operation.getColaborator();
        this.colaboratorEmail = operation.getColaboratorEmail();
        this.colaboratorPhone = operation.getColaboratorPhone();
        this.productOption = operation.getProductOption();
        this.additionalProducts = operation.getAdditionalProducts();
        this.operationDetails = operation.getOperationDetails();
        this.customer = operation.getCustomer();
        this.installationAddress = operation.getInstallationAddress();
        this.shippingAdress = operation.getShippingAddress();
        this.documentation = operation.getDocumentation();
    }
}
