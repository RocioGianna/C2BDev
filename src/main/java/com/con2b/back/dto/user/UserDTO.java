package com.con2b.back.dto.user;

import com.con2b.back.model.user.User2b;
import com.con2b.back.model.user.Role;

import java.util.List;

public class UserDTO {

    private String email;
    private String firstname;
    private String lastname;
    private List<Role> roles;

    public UserDTO(User2b user){
        this.email = user.getEmail();
        this.firstname = user.getFirstname();
        this.lastname = user.getLastname();
        this.roles = user.getRoles();
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getFirstname() {
        return firstname;
    }

    public void setFirstname(String firstname) {
        this.firstname = firstname;
    }

    public String getLastname() {
        return lastname;
    }

    public void setLastname(String lastname) {
        this.lastname = lastname;
    }

    public List<Role> getRoles() {
        return roles;
    }

    public void setRoles(List<Role> roles) {
        this.roles = roles;
    }
}
