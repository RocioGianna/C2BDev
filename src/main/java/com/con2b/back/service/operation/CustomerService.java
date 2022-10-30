package com.con2b.back.service.operation;

import com.con2b.back.model.operation.Address;
import com.con2b.back.model.operation.Customer;
import com.con2b.back.repository.operation.AddressRepository;
import com.con2b.back.repository.operation.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@Transactional
public class CustomerService {

    @Autowired
    private CustomerRepository customerRepository;
    @Autowired
    private AddressRepository addressRepository;

    public Customer saveCustomer(Customer customer){
        if(customer != null){
            addressRepository.save(customer.getAddress());
            return customerRepository.save(customer);
        }else{
            return null;
        }
    }

}
