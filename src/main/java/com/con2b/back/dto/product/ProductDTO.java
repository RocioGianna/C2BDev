package com.con2b.back.dto.product;

import com.con2b.back.model.product.AdditionalProduct;
import com.con2b.back.model.product.Product;
import com.con2b.back.model.product.ProductOption;

import java.util.Set;
import java.util.stream.Collectors;

public class ProductDTO {

    private Long id;
    private String name;
    private Set<ProductOption> options;
    private Set<Long> availableAdditionals;
    private boolean isProfessional;

    public ProductDTO(Product product) {
        this.id = product.getId();
        this.name = product.getName();
        this.options = product.getOptions();
        this.availableAdditionals = product.getAvailableAdditionals().stream().map(AdditionalProduct::getId).collect(Collectors.toSet());
        this.isProfessional = product.isProfessional();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Set<ProductOption> getOptions() {
        return options;
    }

    public void setOptions(Set<ProductOption> options) {
        this.options = options;
    }

    public Set<Long> getAvailableAdditionals() {
        return availableAdditionals;
    }

    public void setAvailableAdditionals(Set<Long> availableAdditionals) {
        this.availableAdditionals = availableAdditionals;
    }

    public boolean isProfessional() {
        return isProfessional;
    }

    public void setProfessional(boolean professional) {
        isProfessional = professional;
    }
}
