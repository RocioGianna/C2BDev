package com.con2b.back.model.operation;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class LineType {
    @Id @GeneratedValue
    Long id;

    String name;

    boolean isMobile;

    public LineType() {
    }

    public LineType(Long id, String name, boolean isMobile) {
        this.id = id;
        this.name = name;
        this.isMobile = isMobile;
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

    public boolean isMobile() {
        return isMobile;
    }

    public void setMobile(boolean mobile) {
        isMobile = mobile;
    }
}
