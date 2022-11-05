package com.con2b.back.model.product;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.Set;

@Entity
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

    public Product() {}

    public Product(Long id, String name, String description, Set<ProductOption> options, Set<AdditionalProduct> availableAdditionals, boolean isProfessional) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.options = options;
        this.availableAdditionals = availableAdditionals;
        this.isProfessional = isProfessional;
    }

    public void setId(Long id) {
        this.id = id;
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

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Set<ProductOption> getOptions() {
        return options;
    }

    public void setOptions(Set<ProductOption> options) {
        this.options = options;
    }

    public void addOption(ProductOption option){
        this.options.add(option);
    }
    public Set<AdditionalProduct> getAvailableAdditionals() {
        return availableAdditionals;
    }

    public void setAvailableAdditionals(Set<AdditionalProduct> availableAdditionals) {
        this.availableAdditionals = availableAdditionals;
    }

    public void addAvailableAdditional(AdditionalProduct additionalProduct){
        this.availableAdditionals.add(additionalProduct);
    }

    public boolean isProfessional() {
        return isProfessional;
    }

    public void setProfessional(boolean isProfessional) {
        this.isProfessional = isProfessional;
    }
}
