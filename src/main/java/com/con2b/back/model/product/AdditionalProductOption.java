package com.con2b.back.model.product;

import com.con2b.back.model.operation.LineType;
import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.LazyCollection;
import org.hibernate.annotations.LazyCollectionOption;

import javax.persistence.*;
import java.util.List;

@Entity
public class AdditionalProductOption {

    @Id @GeneratedValue
    private Long id;
    private String name;
    private String description;
    @ManyToMany
    @LazyCollection(LazyCollectionOption.FALSE)
    private List<LineType> steps;
    private boolean isPopular;
    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnore
    private AdditionalProduct additionalProduct;

    public AdditionalProductOption() {}

    public AdditionalProductOption(Long id, String name, String description, List<LineType> steps, boolean isPopular, AdditionalProduct additionalProduct) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.steps = steps;
        this.isPopular = isPopular;
        this.additionalProduct = additionalProduct;
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

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<LineType> getSteps() {
        return steps;
    }

    public void setSteps(List<LineType> steps) {
        this.steps = steps;
    }

    public boolean isPopular() {
        return isPopular;
    }

    public void setPopular(boolean popular) {
        isPopular = popular;
    }

    public AdditionalProduct getAdditionalProduct() {
        return additionalProduct;
    }

    public void setAdditionalProduct(AdditionalProduct additionalProduct) {
        this.additionalProduct = additionalProduct;
    }
}
