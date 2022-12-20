package com.con2b.back.model.operation;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Documentation {
    @Id
    @GeneratedValue
    private Long id;
    private String path;
    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnore
    private Operation operation;

    public Documentation(Long id, String path) {
        this.id = id;
        this.path = path;
    }
}
