package com.con2b.back;

import com.con2b.back.model.User2b;
import com.con2b.back.model.Role;
import com.con2b.back.service.UserService;
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
			userService.saveUser(new User2b(null, "user@2bconexion.com", "pass", "User", "User",  true, new ArrayList<>()));
			userService.addRoleToUser("user@2bconexion.com", Role.USER);

			userService.saveUser(new User2b(null, "admin@2bconexion.com", "pass", "Admin", "Admin", true, new ArrayList<>()));
			userService.addRoleToUser("admin@2bconexion.com", Role.ADMIN);

			userService.saveUser(new User2b(null, "both@2bconexion.com", "pass", "Admin", "User", true, new ArrayList<>()));
			userService.addRoleToUser("both@2bconexion.com", Role.ADMIN);
			userService.addRoleToUser("both@2bconexion.com", Role.USER);
		};
	}

	@Bean
	public PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}
}
