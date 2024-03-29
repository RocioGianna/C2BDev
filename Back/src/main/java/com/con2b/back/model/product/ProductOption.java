package com.con2b.back.model.product;

import com.con2b.back.model.operation.Step;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


import javax.persistence.*;
import java.util.List;

@Entity
@JsonIgnoreProperties({"handler", "hibernateLazyInitializer", "FieldHandler"})
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ProductOption {

    @Id @GeneratedValue
    private Long id;
    private String name;
    private String description;
    @ManyToMany(fetch = FetchType.EAGER)
    private List<Step> steps;
    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private Product product;
}
