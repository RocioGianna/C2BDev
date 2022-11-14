package com.con2b.back.dto.operation;

import com.con2b.back.model.operation.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.List;
import java.util.Set;
@Getter
@Setter
@AllArgsConstructor
public class NewOperationDTO {
    private String colaboratorCode;
    private String colaboratorEmail;
    private String colaboratorPhone;
    private Long productOptionId;
    private List<Long> additionalIds;
    private Set<OperationDetails>operationDetails;
    private Customer customer;
    private Address installationAddress;
    private Address shippingAddress;
    private Set<Long> documentationId;

}
