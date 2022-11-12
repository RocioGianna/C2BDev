package com.con2b.back.model.operation;

import com.con2b.back.model.product.AdditionalProductOption;
import com.con2b.back.model.product.ProductOption;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class OperationDetails {

    @Id
    @GeneratedValue
    private Long id;

    private Long stepId;

    private OperationDetailsType type;

    @Column(nullable = true)
    private String phone;

    @Column(nullable = true)
    private String currentProvider;

    @Column(nullable = true)
    private String  currentOwnerFirstname;

    @Column(nullable = true)
    private String currentOwnerLastname;

    @Column(nullable = true)
    private String currentOwnerNID;

}
