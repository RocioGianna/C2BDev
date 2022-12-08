package com.con2b.back.model.user;

import com.con2b.back.model.product.Provider;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.LazyCollection;
import org.hibernate.annotations.LazyCollectionOption;

import javax.persistence.*;
import java.util.Set;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class User2b {
    @Id @GeneratedValue
    private Long id;
    private String email;
    private String password;
    private String firstname;
    private String lastname;
    private String userCode;
    private String phone;
    private boolean enabled;
    private Role role;
    @ManyToMany
    @LazyCollection(LazyCollectionOption.FALSE)
    private Set<Provider> allowedProviders;

    public void addAllowedProvider(Provider provider){
        this.allowedProviders.add(provider);
    }

    public void removeAllowedProvider(Provider provider){
        this.allowedProviders.remove(provider);
    }
}
