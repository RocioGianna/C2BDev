package com.con2b.back.model.user;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.List;

@Entity @Getter
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

    private String phone;
    private boolean enabled;
    @ElementCollection(fetch = FetchType.EAGER)
    private List<Role> roles;
    public void addRole(Role role) {
        this.roles.add(role);
    }

}
