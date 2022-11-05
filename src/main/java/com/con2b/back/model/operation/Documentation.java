package com.con2b.back.model.operation;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
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
}
