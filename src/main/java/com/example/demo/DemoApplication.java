package com.example.demo;

import com.example.demo.user.AppUser;
import com.example.demo.user.Role;
import com.example.demo.user.UserService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.ArrayList;

@SpringBootApplication
public class DemoApplication {

	public static void main(String[] args) {
		SpringApplication.run(DemoApplication.class, args);
	}

	@Bean
	CommandLineRunner run (UserService userService){
		return args -> {
			userService.saveRole(new Role("USER"));
			userService.saveRole(new Role("ADMIN"));

			userService.saveUser(new AppUser(null, "user@2bconexion.com", "pass", true, new ArrayList<>()));
			userService.addRoleToUser("user@2bconexion.com", "USER");

			userService.saveUser(new AppUser(null, "admin@2bconexion.com", "pass", true, new ArrayList<>()));
			userService.addRoleToUser("admin@2bconexion.com", "ADMIN");

		};
	}

	@Bean
	public PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}
}
