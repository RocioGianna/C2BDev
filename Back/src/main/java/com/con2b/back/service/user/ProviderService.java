package com.con2b.back.service.user;

import com.con2b.back.model.product.Provider;
import com.con2b.back.repository.user.ProviderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@Transactional
public class ProviderService {

    @Autowired
    private ProviderRepository providerRepository;


    public Provider saveProvider(Provider provider){
        return providerRepository.save(provider);
    }

}
