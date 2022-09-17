package com.con2b.back.service.operation;

import com.con2b.back.model.operation.LineType;
import com.con2b.back.repository.operation.LineTypeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service @Transactional
public class OperationService {

    @Autowired
    private LineTypeRepository lineTypeRepository;

    public LineType saveLineType(LineType lineType){
        return lineTypeRepository.save(lineType);
    }
}
