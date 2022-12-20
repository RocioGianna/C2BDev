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
public class AdditionalProduct {

    @Id @GeneratedValue
    private Long id;
    private String name;
    @OneToMany(mappedBy = "additionalProduct")
    private Set<AdditionalProductOption> options;
    @ManyToMany(fetch = FetchType.LAZY, mappedBy = "availableAdditionals")
    @JsonIgnore
    private Set<Product> parentProducts;
    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnore
    private Provider provider;

    public void addOption(AdditionalProductOption option){
        this.options.add(option);
    }

}
