package com.example.demo;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping(path = "/api/v1/test")
@RestController
@PreAuthorize("isAuthenticated()")
public class TestResource {

    @GetMapping()
    public String testEndpoint1(){
        return "Hello world!";
    }

    @GetMapping("/user")
    @PreAuthorize("hasRole('USER')")
    public String testEndpoint2(){
        return "Hello user!";
    }


    @GetMapping("/admin")
    @PreAuthorize("hasRole('ADMIN')")
    public String testEndpoint3(){
        return "Hello admin!";
    }

}
