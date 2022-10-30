package com.con2b.back.service.operation;


import com.con2b.back.model.operation.Address;
import com.con2b.back.repository.operation.AddressRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service @Transactional
public class AddressService {

    @Autowired
    private AddressRepository addressRepository;

    public Address saveAddress(Address address){
        if(address != null)
            return addressRepository.save(address);
        else
            return null;
    }
}
