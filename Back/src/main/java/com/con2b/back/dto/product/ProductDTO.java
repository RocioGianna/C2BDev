package com.con2b.back.dto.product;

import com.con2b.back.model.product.AdditionalProduct;
import com.con2b.back.model.product.Product;
import com.con2b.back.model.product.ProductOption;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Set;
import java.util.stream.Collectors;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ProductDTO {

    private Long id;
    private String name;
    private String description;
    private Set<ProductOption> options;
    private Set<Long> availableAdditionals;
    private boolean isProfessional;

    public ProductDTO(Product product) {
        this.id = product.getId();
        this.name = product.getName();
        this.description = product.getDescription();
        this.options = product.getOptions();
        this.availableAdditionals = product.getAvailableAdditionals().stream().map(AdditionalProduct::getId).collect(Collectors.toSet());
        this.isProfessional = product.isProfessional();
    }

}
