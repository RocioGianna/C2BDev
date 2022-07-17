package com.example.demo.user;

import java.util.List;
import java.util.stream.Collectors;

public class UserDTO {
    private String email;
    private String firstname;
    private String lastname;
    private List<String> roles;

    public UserDTO(AppUser user){
        this.email = user.getEmail();
        this.firstname = user.getEmail();
        this.lastname = user.getLastname();
        this.roles = user.getRoles().stream().map(Role::getName).collect(Collectors.toList());
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

    public List<String> getRoles() {
        return roles;
    }

    public void setRoles(List<String> roles) {
        this.roles = roles;
    }
}
