package com.con2b.back.repository.operation;

import com.con2b.back.model.operation.Operation;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OperationRepository extends JpaRepository<Operation, Long> {

}
