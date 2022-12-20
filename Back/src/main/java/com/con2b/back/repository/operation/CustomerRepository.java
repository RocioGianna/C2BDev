package com.con2b.back.repository.operation;

import com.con2b.back.model.operation.Customer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CustomerRepository extends JpaRepository<Customer, Long> {
}
