package com.con2b.back;

import com.con2b.back.beans.operation.OperationEditPermissions;
import com.con2b.back.beans.operation.OperationPossibleNextStatus;
import com.con2b.back.model.operation.*;
import com.con2b.back.model.product.*;
import com.con2b.back.model.user.User2b;
import com.con2b.back.model.user.Role;
import com.con2b.back.model.product.AdditionalProduct;
import com.con2b.back.model.product.Product;
import com.con2b.back.model.product.ProductOption;
import com.con2b.back.service.operation.OperationService;
import com.con2b.back.service.user.ProviderService;
import com.con2b.back.service.user.UserService;
import com.con2b.back.service.product.ProductService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import org.springframework.context.annotation.Bean;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.io.*;
import java.util.*;

@SpringBootApplication
public class App extends SpringBootServletInitializer {

	public static void main(String[] args) {
		SpringApplication.run(App.class, args);
	}

	@Override
	protected SpringApplicationBuilder configure(SpringApplicationBuilder builder) {
		return builder.sources(App.class);
	}

	@Bean
	CommandLineRunner createProducts(ProductService productService, OperationService operationService, ProviderService providerService,UserService userService){
		return args -> {
			Provider movistar = providerService.saveProvider(new Provider(null, "MOVISTAR", new HashSet<>(), new HashSet<>()));
			Provider otherProvider= providerService.saveProvider(new Provider(null, "OTHER_PROVIDER", new HashSet<>(), new HashSet<>()));
			Set<Provider> providers = new HashSet<>();

			providers.add(movistar);
			Address address = new Address(null,"Dirección 1", "1111", "Municipalidad 1", "Provincia 1");
			User2b collabMovi = userService.createUser("001", "user_movistar@2bconexion.com", "pass", "User", "Movistar", "11111111", "+54 2494000001", "abc.1", address, Role.COLLABORATOR, providers);

			providers.add(otherProvider);
			address.setAddress("Dirección 2");
			User2b collab = userService.createUser("002", "user@2bconexion.com", "pass", "User", "All", "22222222", "+54 2494000002","abc.2", address, Role.COLLABORATOR, providers);

			address.setAddress("Dirección 3");
			User2b processor = userService.createUser("003", "processor@2bconexion.com", "pass", "Processor", "Simple", "33333333", "+54 2494000003", "abc.3", address, Role.PROCESSOR, new HashSet<>());

			address.setAddress("Dirección 4");
			User2b processorAdvanced = userService.createUser("004", "processor_advanced@2bconexion.com", "pass", "Processor", "Advanced", "44444444", "+54 2494000004", "abc.4", address, Role.PROCESSOR_ADVANCED, new HashSet<>());

			address.setAddress("Dirección 5");
			User2b admin = userService.createUser("005", "admin@2bconexion.com", "pass", "Admin", "Admin", "55555555","+54 2494000005", "abc.5", address, Role.ADMIN, new HashSet<>());

			Step fixed = operationService.saveStep(new Step(null, "Fijo", StepType.FIXED));
			Step fiveGb = operationService.saveStep(new Step(null, "5GB + 0cent/min", StepType.MOBILE));
			Step l = operationService.saveStep(new Step(null, "Línea L", StepType.MOBILE));
			Step xl = operationService.saveStep(new Step(null, "Línea XL", StepType.MOBILE));
			Step infinite = operationService.saveStep(new Step(null, "Línea Infinita", StepType.MOBILE));
			Step bares = operationService.saveStep(new Step(null, "Línea Adicional Bares", StepType.MOBILE));

			Product prod1 = productService.saveProduct(new Product(null, "MiMovistar","Fibra+Movil+Fijo+TV", new HashSet<>(), new HashSet<>(), false, movistar));
			List<Step> steps = new ArrayList<>();
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

			Product prod2 = productService.saveProduct(new Product(null, "Conecta","Solo Internet+Fijo", new HashSet<>(), new HashSet<>(), false, movistar));
			steps.clear();
			steps.add(fixed);
			productService.saveProductOption(new ProductOption(null, "300MB","Solo Internet y Fijo - ADSL o RADIO", steps, prod2));
			productService.saveProductOption(new ProductOption(null, "600MB","Solo Fibra 600MB y Fijo", steps, prod2));
			productService.saveProductOption(new ProductOption(null, "1GB","Solo Fibra 1GB y Fijo", steps, prod2));

			Product prod3 = productService.saveProduct(new Product(null, "Contrato Móvil","Sólo móvil", new HashSet<>(), new HashSet<>(), false, movistar));
			steps.clear();
			steps.add(l);
			productService.saveProductOption(new ProductOption(null, "Línea L","Llamadas Y Sms Ilimitados Y 8GB", steps, prod3));
			steps.clear();
			steps.add(xl);
			productService.saveProductOption(new ProductOption(null, "Línea XL","Llamadas Y Sms Ilimitados Y 30GB", steps, prod3));
			steps.clear();
			steps.add(infinite);
			productService.saveProductOption(new ProductOption(null, "Línea Infinita","Llamadas, Sms Y Datos Ilimitados", steps, prod3));

			Product prod4 = productService.saveProduct(new Product(null, "Solo TV Satélite","1P Satelite", new HashSet<>(), new HashSet<>(), false, movistar));
			productService.saveProductOption(new ProductOption(null, "Movistar + Inicia",null, new ArrayList<>(), prod4));
			productService.saveProductOption(new ProductOption(null, "M+ Total Plus",null, new ArrayList<>(), prod4));
			productService.saveProductOption(new ProductOption(null, "M+ Selección Fútbol",null, new ArrayList<>(), prod4));
			productService.saveProductOption(new ProductOption(null, "M+ Selección Ficción",null, new ArrayList<>(), prod4));
			productService.saveProductOption(new ProductOption(null, "M+ Selección Laliga",null, new ArrayList<>(), prod4));
			productService.saveProductOption(new ProductOption(null, "M+ Selección Liga De Campeones",null, new ArrayList<>(), prod4));

			Product prod5 = productService.saveProduct(new Product(null, "Alarmas Hogar",null, new HashSet<>(), new HashSet<>(), false, movistar));
			productService.saveProductOption(new ProductOption(null, "Alarma Avanzada + Exteriores",null, new ArrayList<>(), prod5));
			productService.saveProductOption(new ProductOption(null, "Alarma Avanzada",null, new ArrayList<>(), prod5));
			productService.saveProductOption(new ProductOption(null, "Alarma Esencial",null, new ArrayList<>(), prod5));

			AdditionalProduct addProd1 = productService.saveAdditionalProduct(new AdditionalProduct(null, "TV Particular", new HashSet<>(), new HashSet<>(), movistar));
			productService.saveAdditionalProductOption(new AdditionalProductOption(null, "Ficción Con Netflix", null,new ArrayList<>(),true,addProd1));
			productService.saveAdditionalProductOption(new AdditionalProductOption(null, "Todo El Fútbol", null,new ArrayList<>(),true,addProd1));
			productService.saveAdditionalProductOption(new AdditionalProductOption(null, "Opción Laliga", null,new ArrayList<>(),true,addProd1));
			productService.saveAdditionalProductOption(new AdditionalProductOption(null, "Opción Champions Y Europa League", null,new ArrayList<>(),true,addProd1));
			productService.saveAdditionalProductOption(new AdditionalProductOption(null, "Ficción", null,new ArrayList<>(),true,addProd1));
			productService.saveAdditionalProductOption(new AdditionalProductOption(null, "Deportes", null,new ArrayList<>(),true,addProd1));
			productService.saveAdditionalProductOption(new AdditionalProductOption(null, "Netflix X2", null,new ArrayList<>(),false,addProd1));
			productService.saveAdditionalProductOption(new AdditionalProductOption(null, "Netflix X4", null,new ArrayList<>(),false,addProd1));
			productService.saveAdditionalProductOption(new AdditionalProductOption(null, "Motor", null,new ArrayList<>(),false,addProd1));
			productService.saveAdditionalProductOption(new AdditionalProductOption(null, "Cine", null,new ArrayList<>(),false,addProd1));
			productService.saveAdditionalProductOption(new AdditionalProductOption(null, "Caza Y Pesca", null,new ArrayList<>(),false,addProd1));
			productService.saveAdditionalProductOption(new AdditionalProductOption(null, "Toros", null,new ArrayList<>(),false,addProd1));
			productService.saveAdditionalProductOption(new AdditionalProductOption(null, "Iberalia Tv", null,new ArrayList<>(),false,addProd1));
			productService.saveAdditionalProductOption(new AdditionalProductOption(null, "Playboy", null,new ArrayList<>(),false,addProd1));
			productService.saveAdditionalProductOption(new AdditionalProductOption(null, "Classica", null,new ArrayList<>(),false,addProd1));
			productService.saveAdditionalProductOption(new AdditionalProductOption(null, "Mezzo", null,new ArrayList<>(),false,addProd1));

			AdditionalProduct addProd2 = productService.saveAdditionalProduct(new AdditionalProduct(null, "Linea Movil", new HashSet<>(), new HashSet<>(), movistar));
			steps.clear();
			steps.add(l);
			productService.saveAdditionalProductOption(new AdditionalProductOption(null, "Línea L", "Llamadas Y Sms Ilimitados Y 8GB",steps,true,addProd2));
			steps.clear();
			steps.add(xl);
			productService.saveAdditionalProductOption(new AdditionalProductOption(null, "Línea XL", "Llamadas Y Sms Ilimitados Y 30GB",steps,true,addProd2));
			steps.clear();
			steps.add(infinite);
			productService.saveAdditionalProductOption(new AdditionalProductOption(null, "Línea Infinita", "Llamadas, Sms Y Datos Ilimitados",steps,true,addProd2));

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

	@Bean
	public OperationEditPermissions operationEditPermissions () throws IOException {
		return new OperationEditPermissions();
	}
	@Bean
	public OperationPossibleNextStatus operationPossibleNextStatus () throws IOException {
		return new OperationPossibleNextStatus();
	}

}
