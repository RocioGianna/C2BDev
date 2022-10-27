package com.con2b.back.model.operation;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Entity @NoArgsConstructor @AllArgsConstructor  @Getter @Setter
public class LineType {
    @Id @GeneratedValue
    Long id;

    String name;

    boolean isMobile;
}
