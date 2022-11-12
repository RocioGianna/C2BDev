package com.con2b.back.model.product;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.Set;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Product {

    @Id @GeneratedValue
    private Long id;
    private String name;
    private String description;
    @OneToMany(fetch = FetchType.LAZY)
    @JsonIgnore
    private Set<ProductOption> options;
    @ManyToMany(fetch = FetchType.LAZY)
    @JsonIgnore
    private Set<AdditionalProduct> availableAdditionals;
    private boolean isProfessional;

    public void addOption(ProductOption option){
        this.options.add(option);
    }

    public void addAvailableAdditional(AdditionalProduct additionalProduct){
        this.availableAdditionals.add(additionalProduct);
    }

}
