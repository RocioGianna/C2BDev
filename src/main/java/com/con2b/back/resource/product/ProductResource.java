package com.con2b.back.resource.product;

import com.con2b.back.dto.product.ProductDTO;
import com.con2b.back.model.product.AdditionalProduct;
import com.con2b.back.service.product.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("api/v1")
@PreAuthorize("isAuthenticated()")
public class ProductResource {

    @Autowired
    private ProductService productService;

    @GetMapping("/products")
    public ResponseEntity<List<ProductDTO>> getProducts(){
        return ResponseEntity.ok().body(productService.getProducts().stream().map(ProductDTO::new).collect(Collectors.toList()));
    }

    @GetMapping("/additionals")
    public ResponseEntity<List<AdditionalProduct>> getAdditionalProducts(){
        return ResponseEntity.ok().body(productService.getAdditionals());
    }
}
