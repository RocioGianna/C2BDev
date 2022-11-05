package com.con2b.back.model.product;

import com.con2b.back.model.operation.LineType;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import java.util.List;

@Entity
@JsonIgnoreProperties({"handler", "hibernateLazyInitializer", "FieldHandler"})
public class ProductOption {

    @Id @GeneratedValue
    private Long id;
    private String name;
    private String description;
    @ManyToMany(fetch = FetchType.EAGER)
    private List<LineType> steps;
    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private Product product;

    public ProductOption() {}

    public ProductOption(Long id, String name,String description, List<LineType> steps, Product product) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.steps = steps;
        this.product = product;
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

    public List<LineType> getSteps() {
        return steps;
    }

    public void setSteps(List<LineType> steps) {
        this.steps = steps;
    }

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }
}
