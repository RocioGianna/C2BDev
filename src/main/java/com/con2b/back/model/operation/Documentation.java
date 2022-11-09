package com.con2b.back.model.operation;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
@Entity
public class Documentation {
    @Id
    @GeneratedValue
    private Long id;
    private String path;
    private Boolean deleted;

    public Documentation(){}
    public Documentation(Long id, String path) {
        this.id = id;
        this.path = path;
        this.deleted = false;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getPath() {
        return path;
    }

    public void setPath(String path) {
        this.path = path;
    }


}
