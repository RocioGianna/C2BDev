package com.con2b.back.model.product;

import com.con2b.back.model.operation.Step;
import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.LazyCollection;
import org.hibernate.annotations.LazyCollectionOption;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.List;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class AdditionalProductOption {

    @Id @GeneratedValue
    private Long id;
    private String name;
    private String description;
    @ManyToMany
    @LazyCollection(LazyCollectionOption.FALSE)
    private List<Step> steps;
    private boolean isPopular;
    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnore
    private AdditionalProduct additionalProduct;

}
