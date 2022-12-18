package com.con2b.back.model.product;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.Set;

@Entity
@JsonIgnoreProperties({"handler", "hibernateLazyInitializer", "FieldHandler"})
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Product {

    @Id @GeneratedValue
    private Long id;
    private String name;
    private String description;
    @OneToMany(fetch = FetchType.LAZY, mappedBy = "product")
    @JsonIgnore
    private Set<ProductOption> options;
    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "product_additional_products")
    @JsonIgnore
    private Set<AdditionalProduct> availableAdditionals;
    private boolean isProfessional;
    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnore
    private Provider provider;

    public void addOption(ProductOption option){
        this.options.add(option);
    }

    public void addAvailableAdditional(AdditionalProduct additionalProduct){
        this.availableAdditionals.add(additionalProduct);
    }

}
