package com.con2b.back.model.operation;

import com.con2b.back.model.product.AdditionalProduct;
import com.con2b.back.model.product.AdditionalProductOption;
import com.con2b.back.model.product.ProductOption;
import com.con2b.back.model.user.User2b;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.util.Date;
import java.util.Set;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
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

    @ManyToOne
    private User2b processor;

    @ManyToOne
    private User2b colaborator;

    @Column(nullable = true)
    private String colaboratorEmail;

    @Column(nullable = true)
    private String colaboratorPhone;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
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
}
