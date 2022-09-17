package com.con2b.back.model.product;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.Set;

@Entity
public class AdditionalProduct {

    @Id @GeneratedValue
    private Long id;
    private String name;
    @OneToMany(fetch = FetchType.EAGER)
    private Set<AdditionalProductOption> options;
    @ManyToMany(fetch = FetchType.LAZY)
    @JsonIgnore
    private Set<Product> parentProducts;

    public void setId(Long id) {
        this.id = id;
    }

    public AdditionalProduct() {}

    public AdditionalProduct(Long id, String name, Set<AdditionalProductOption> options, Set<Product> parentProducts) {
        this.id = id;
        this.name = name;
        this.options = options;
        this.parentProducts = parentProducts;
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Set<AdditionalProductOption> getOptions() {
        return options;
    }

    public void setOptions(Set<AdditionalProductOption> options) {
        this.options = options;
    }

    public void addOption(AdditionalProductOption option){
        this.options.add(option);
    }

    public Set<Product> getParentProducts() {
        return parentProducts;
    }

    public void setParentProducts(Set<Product> parentProducts) {
        this.parentProducts = parentProducts;
    }
}
