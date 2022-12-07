package com.con2b.back.dto.operation;

import com.con2b.back.model.operation.OperationDetailsType;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class OperationDetailEditDTO {
    private OperationDetailsType type;

    private String phone;

    private String currentProvider;

    private String  currentOwnerFirstname;

    private String currentOwnerLastname;

    private String currentOwnerNID;

}
