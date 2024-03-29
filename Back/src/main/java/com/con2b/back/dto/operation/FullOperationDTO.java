package com.con2b.back.dto.operation;

import com.con2b.back.dto.user.UserDTO;
import com.con2b.back.model.operation.*;
import com.con2b.back.model.product.AdditionalProductOption;
import com.con2b.back.model.product.ProductOption;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;
import java.util.List;
import java.util.Set;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class FullOperationDTO {

    private Long id;
    private String operationCode;
    private Boolean reprocess;
    private Date creationDate;
    private Status status;
    private Channel channel;
    private UserDTO processor;
    private UserDTO collaborator;
    private String collaboratorEmail;
    private String collaboratorPhone;
    private ProductOption productOption;
    private List<AdditionalProductOption> additionalProducts;
    private Set<OperationDetails>operationDetails;
    private Customer customer;
    private Address installationAddress;
    private Address shippingAddress;
    private Set<Documentation> documentation;

    public FullOperationDTO(Operation operation) {
        this.id = operation.getId();
        this.operationCode = operation.getOperationCode();
        this.reprocess = operation.getReprocess();
        this.creationDate = operation.getCreationDate();
        this.status = operation.getStatus();
        this.channel = operation.getChannel();
        this.processor = operation.getProcessor() != null ? new UserDTO(operation.getProcessor()) : null;
        this.collaborator = operation.getCollaborator() != null ? new UserDTO(operation.getCollaborator()) : null;
        this.collaboratorEmail = operation.getCollaboratorEmail();
        this.collaboratorPhone = operation.getCollaboratorPhone();
        this.productOption = operation.getProductOption();
        this.additionalProducts = operation.getAdditionalProducts();
        this.operationDetails = operation.getOperationDetails();
        this.customer = operation.getCustomer();
        this.installationAddress = operation.getInstallationAddress();
        this.shippingAddress = operation.getShippingAddress();
        this.documentation = operation.getDocumentation();
    }
}
