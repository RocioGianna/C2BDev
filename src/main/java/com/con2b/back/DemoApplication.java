package com.con2b.back;

import com.con2b.back.model.product.AdditionalProductOption;
import com.con2b.back.model.user.User2b;
import com.con2b.back.model.user.Role;
import com.con2b.back.model.product.AdditionalProduct;
import com.con2b.back.model.operation.LineType;
import com.con2b.back.model.product.Product;
import com.con2b.back.model.product.ProductOption;
import com.con2b.back.service.operation.OperationService;
import com.con2b.back.service.user.UserService;
import com.con2b.back.service.product.ProductService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;

@SpringBootApplication
public class DemoApplication {

	public static void main(String[] args) {
		SpringApplication.run(DemoApplication.class, args);
	}

	@Bean
	CommandLineRunner createUsers (UserService userService){
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
	CommandLineRunner createProducts(ProductService productService, OperationService operationService){
		return args -> {
			LineType fixed = operationService.saveLineType(new LineType(null, "Fijo", false));
			LineType fiveGb = operationService.saveLineType(new LineType(null, "5GB + 0cent/min", true));
			LineType l = operationService.saveLineType(new LineType(null, "Línea L", true));
			LineType xl = operationService.saveLineType(new LineType(null, "Línea XL", true));
			LineType infinite = operationService.saveLineType(new LineType(null, "Línea Infinita", true));
			LineType bares = operationService.saveLineType(new LineType(null, "Línea Adicional Bares", true));

			Product prod1 = productService.saveProduct(new Product(null, "MiMovistar","Paquete Fibra, Movil, Fijo y TV", new HashSet<>(), new HashSet<>(), false));
			List<LineType> steps = new ArrayList<>();
			steps.add(fixed);
			steps.add(xl);
			steps.add(fiveGb);
			productService.saveProductOption(new ProductOption(null, "Movistar MAX","ADSL / Fibra 300, Fijo con llamadas a fijos, TV Movistar+ Inicia, Línea XL, 5GB + 0cent/min incluida gratuita", steps, prod1));
			steps.clear();
			steps.add(fixed);
			steps.add(infinite);
			steps.add(fiveGb);
			productService.saveProductOption(new ProductOption(null, "Movistar Ilimitado","ADSL / Fibra 1GB / Radio, Fijo ilim. a fijos + FM550, TV Movistar+ Inicia, Línea Infinita, 5GB + 0cent/min incluida gratuita", steps, prod1));
			steps.add(2,infinite);
			productService.saveProductOption(new ProductOption(null, "Movistar Ilimitado x2","ADSL / Fibra 1GB / Radio, Fijo ilim. a fijos + FM550, TV Movistar+ Inicia, Línea Infinita, Línea Infinita, 5GB + 0cent/min incluida gratuita", steps, prod1));

			Product prod2 = productService.saveProduct(new Product(null, "Conecta","Solo Internet y Fijo - ADSL o RADIO", new HashSet<>(), new HashSet<>(), false));
			steps.clear();
			steps.add(fixed);
			productService.saveProductOption(new ProductOption(null, "Conecta","Solo Internet y Fijo - ADSL o RADIO", steps, prod2));

			prod2 = productService.saveProduct(new Product(null, "Conecta 600","Solo Fibra 600 y Fijo", new HashSet<>(), new HashSet<>(), false));
			productService.saveProductOption(new ProductOption(null, "Conecta 600","Solo Fibra 600 y Fijo", steps, prod2));

			Product prod3 = productService.saveProduct(new Product(null, "Contrato Móvil","Solo móvil", new HashSet<>(), new HashSet<>(), false));
			steps.clear();
			steps.add(l);
			productService.saveProductOption(new ProductOption(null, "Línea L","Llamadas Y Sms Ilimitados Y 8GB", steps, prod3));
			steps.clear();
			steps.add(xl);
			productService.saveProductOption(new ProductOption(null, "Línea XL","Llamadas Y Sms Ilimitados Y 30GB", steps, prod3));
			steps.clear();
			steps.add(infinite);
			productService.saveProductOption(new ProductOption(null, "Línea Infinita","Llamadas, Sms Y Datos Ilimitados", steps, prod3));

			Product prod4 = productService.saveProduct(new Product(null, "Solo TV Satélite","1P Satelite", new HashSet<>(), new HashSet<>(), false));
			productService.saveProductOption(new ProductOption(null, "Movistar + Inicia",null, new ArrayList<>(), prod4));
			productService.saveProductOption(new ProductOption(null, "M+ Total Plus",null, new ArrayList<>(), prod4));
			productService.saveProductOption(new ProductOption(null, "M+ Selección Fútbol",null, new ArrayList<>(), prod4));
			productService.saveProductOption(new ProductOption(null, "M+ Selección Ficción",null, new ArrayList<>(), prod4));
			productService.saveProductOption(new ProductOption(null, "M+ Selección Laliga",null, new ArrayList<>(), prod4));
			productService.saveProductOption(new ProductOption(null, "M+ Selección Liga De Campeones",null, new ArrayList<>(), prod4));

			Product prod5 = productService.saveProduct(new Product(null, "Alarmas Hogar",null, new HashSet<>(), new HashSet<>(), false));
			productService.saveProductOption(new ProductOption(null, "Alarma Avanzada + Exteriores",null, new ArrayList<>(), prod5));
			productService.saveProductOption(new ProductOption(null, "Alarma Avanzada",null, new ArrayList<>(), prod5));
			productService.saveProductOption(new ProductOption(null, "Alarma Esencial",null, new ArrayList<>(), prod5));

			AdditionalProduct addProd1 = productService.saveAdditionalProduct(new AdditionalProduct(null, "TV Particular", new HashSet<>(), new HashSet<>()));
			productService.saveAdditionalProductOption(new AdditionalProductOption(null, "Ficción Con Netflix", null,new ArrayList<>(),addProd1));
			productService.saveAdditionalProductOption(new AdditionalProductOption(null, "Todo El Fútbol", null,new ArrayList<>(),addProd1));
			productService.saveAdditionalProductOption(new AdditionalProductOption(null, "Opción Laliga", null,new ArrayList<>(),addProd1));
			productService.saveAdditionalProductOption(new AdditionalProductOption(null, "Opción Champions Y Europa League", null,new ArrayList<>(),addProd1));
			productService.saveAdditionalProductOption(new AdditionalProductOption(null, "Ficción", null,new ArrayList<>(),addProd1));
			productService.saveAdditionalProductOption(new AdditionalProductOption(null, "Deportes", null,new ArrayList<>(),addProd1));
			productService.saveAdditionalProductOption(new AdditionalProductOption(null, "Netflix X2", null,new ArrayList<>(),addProd1));
			productService.saveAdditionalProductOption(new AdditionalProductOption(null, "Netflix X4", null,new ArrayList<>(),addProd1));
			productService.saveAdditionalProductOption(new AdditionalProductOption(null, "Motor", null,new ArrayList<>(),addProd1));
			productService.saveAdditionalProductOption(new AdditionalProductOption(null, "Cine", null,new ArrayList<>(),addProd1));
			productService.saveAdditionalProductOption(new AdditionalProductOption(null, "Caza Y Pesca", null,new ArrayList<>(),addProd1));
			productService.saveAdditionalProductOption(new AdditionalProductOption(null, "Toros", null,new ArrayList<>(),addProd1));
			productService.saveAdditionalProductOption(new AdditionalProductOption(null, "Iberalia Tv", null,new ArrayList<>(),addProd1));
			productService.saveAdditionalProductOption(new AdditionalProductOption(null, "Playboy", null,new ArrayList<>(),addProd1));
			productService.saveAdditionalProductOption(new AdditionalProductOption(null, "Classica", null,new ArrayList<>(),addProd1));
			productService.saveAdditionalProductOption(new AdditionalProductOption(null, "Mezzo", null,new ArrayList<>(),addProd1));

			AdditionalProduct addProd2 = productService.saveAdditionalProduct(new AdditionalProduct(null, "Linea Movil", new HashSet<>(), new HashSet<>()));
			steps.clear();
			steps.add(fiveGb);
			productService.saveAdditionalProductOption(new AdditionalProductOption(null, "5GB + 0cent/min", "Llamadas 0Cent/Min Y 5Gb",steps,addProd2));
			steps.clear();
			steps.add(l);
			productService.saveAdditionalProductOption(new AdditionalProductOption(null, "Línea L", "Llamadas Y Sms Ilimitados Y 8GB",steps,addProd2));
			steps.clear();
			steps.add(xl);
			productService.saveAdditionalProductOption(new AdditionalProductOption(null, "Línea XL", "Llamadas Y Sms Ilimitados Y 30GB",steps,addProd2));
			steps.clear();
			steps.add(infinite);
			productService.saveAdditionalProductOption(new AdditionalProductOption(null, "Línea Infinita", "Llamadas, Sms Y Datos Ilimitados",steps,addProd2));

			productService.addAdditionalToProduct(prod1, addProd1);
			productService.addAdditionalToProduct(prod1, addProd2);

			productService.addAdditionalToProduct(prod3, addProd2);

			productService.addAdditionalToProduct(prod4, addProd1);

		};
	}

	@Bean
	public PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}
}
