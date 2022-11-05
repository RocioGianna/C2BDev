package com.con2b.back.service.operation;

import com.con2b.back.model.operation.OperationDetails;
import com.con2b.back.repository.operation.OperationDetailsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@Transactional
public class OperationDetailsService {

    @Autowired
    private OperationDetailsRepository operationDetailsRepository;

    public OperationDetails saveOperationDetails(OperationDetails operationDetails){
        return operationDetailsRepository.save(operationDetails);
    }
}
