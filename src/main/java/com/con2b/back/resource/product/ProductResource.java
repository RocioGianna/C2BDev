package com.con2b.back.resource.product;

import com.con2b.back.dto.product.ProductDTO;
import com.con2b.back.service.product.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.stream.Collectors;

@RestController
@RequestMapping("api/v1")
@PreAuthorize("isAuthenticated()")
public class ProductResource {

    @Autowired
    private ProductService productService;

    @GetMapping("/products")
    public ResponseEntity<?> getProducts(){
        HashMap<String, Object> res = new HashMap<>();
        res.put("data", productService.getProducts().stream().map(ProductDTO::new).collect(Collectors.toList()));
        res.put("ok", true);
        return ResponseEntity.ok().body(res);
    }

    @GetMapping("/additionals")
    public ResponseEntity<?> getAdditionalProducts(){
        HashMap<String, Object> res = new HashMap<>();
        res.put("data", productService.getAdditionals());
        res.put("ok", true);
        return ResponseEntity.ok().body(res);
    }
}
