package com.con2b.back.repository.operation;

import com.con2b.back.model.operation.Address;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AddressRepository extends JpaRepository<Address, Long> {
}
