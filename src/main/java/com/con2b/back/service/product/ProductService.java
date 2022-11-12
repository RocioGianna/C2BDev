package com.con2b.back.service.product;

import com.con2b.back.model.product.AdditionalProduct;
import com.con2b.back.model.product.AdditionalProductOption;
import com.con2b.back.model.product.Product;
import com.con2b.back.model.product.ProductOption;
import com.con2b.back.repository.product.AdditionalProductOptionRepository;
import com.con2b.back.repository.product.AdditionalProductRepository;
import com.con2b.back.repository.product.ProductOptionRepository;
import com.con2b.back.repository.product.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.*;

@Service @Transactional
public class ProductService {

    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private ProductOptionRepository productOptionRepository;
    @Autowired
    private AdditionalProductRepository additionalProductRepository;
    @Autowired
    private AdditionalProductOptionRepository additionalProductOptionRepository;

    public List<Product> getProducts(){
        return productRepository.findAll();
    }

    public List<AdditionalProduct> getAdditionals(){
        return additionalProductRepository.findAll();
    }

    public Product saveProduct(Product product){
        return productRepository.save(product);
    }

    public AdditionalProduct saveAdditionalProduct(AdditionalProduct additionalProduct){
        return additionalProductRepository.save(additionalProduct);
    }

    public void addAdditionalToProduct(Long productId, AdditionalProduct additionalProduct) throws Exception {
        Optional<Product> savedProduct = productRepository.findById(productId);
        if(savedProduct.isEmpty()){
            throw new Exception("Product with id " + productId + " not found");
        }
        savedProduct.get().addAvailableAdditional(additionalProduct);
    }

    public void addAdditionalToProduct(Product product, AdditionalProduct additionalProduct) throws Exception {
        addAdditionalToProduct(product.getId(), additionalProduct);
    }

    public ProductOption saveProductOption(ProductOption option) throws Exception {
        Optional<Product> product = productRepository.findById(option.getProduct().getId());
        if(product.isEmpty()){
            throw new Exception("Product with id " + option.getProduct().getId() + " not found");
        }
        ProductOption savedOption = productOptionRepository.save(option);
        product.get().addOption(savedOption);
        return savedOption;
    }

    public AdditionalProductOption saveAdditionalProductOption(AdditionalProductOption option) throws Exception {
        Optional<AdditionalProduct> additionalProduct = additionalProductRepository.findById(option.getAdditionalProduct().getId());
        if(additionalProduct.isEmpty()){
            throw new Exception("Product with id " + option.getAdditionalProduct().getId() + " not found");
        }
        AdditionalProductOption savedOption = additionalProductOptionRepository.save(option);
        additionalProduct.get().addOption(savedOption);
        return savedOption;
    }

    public ProductOption getProductOptionById(Long id){
        return productOptionRepository.findById(id).get();
    }

    public List<Optional<AdditionalProductOption>> getAdditionalProductOptionsById(List<Long> listId){
        List<Optional<AdditionalProductOption>> res = new ArrayList<>();
        for (Long id: listId) {
            res.add(additionalProductOptionRepository.findById(id));
        }
        if (!res.isEmpty()) return res;
        return new ArrayList<>();
    }

}
