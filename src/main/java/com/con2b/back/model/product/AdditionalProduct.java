package com.con2b.back.model.product;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.Set;

@Entity @Getter
@Setter @AllArgsConstructor @NoArgsConstructor
public class AdditionalProduct {

    @Id @GeneratedValue
    private Long id;
    private String name;
    @OneToMany(fetch = FetchType.EAGER)
    private Set<AdditionalProductOption> options;
    @ManyToMany(fetch = FetchType.LAZY)
    @JsonIgnore
    private Set<Product> parentProducts;

    public void addOption(AdditionalProductOption option){
        this.options.add(option);
    }

}
