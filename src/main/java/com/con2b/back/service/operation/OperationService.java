package com.con2b.back.service.operation;

import com.con2b.back.dto.operation.NewOperationDTO;
import com.con2b.back.model.operation.*;
import com.con2b.back.model.product.AdditionalProduct;
import com.con2b.back.repository.operation.DocumentationRepository;
import com.con2b.back.repository.operation.LineTypeRepository;
import com.con2b.back.repository.operation.OperationRepository;
import com.con2b.back.service.product.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

@Service @Transactional
public class OperationService {

    @Autowired
    private LineTypeRepository lineTypeRepository;
    @Autowired
    private OperationRepository operationRepository;
    @Autowired
    private DocumentationRepository documentationRepository;
    @Autowired
    private ProductService productService;

    public LineType saveLineType(LineType lineType){
        return lineTypeRepository.save(lineType);
    }

    public Operation createOperation(NewOperationDTO newOperationDTO){
        String operationCode = "XXX";

        Operation operation = new Operation();

        operation.setOperationCode(operationCode);
        operation.setStatus(Status.PENDING_PROCESSING);
        operation.setColaboratorCode(newOperationDTO.getColaboratorCode());
        if(newOperationDTO.getColaboratorEmail() != null && !newOperationDTO.getColaboratorEmail().isEmpty())
            operation.setColaboratorEmail(newOperationDTO.getColaboratorEmail());
        if(newOperationDTO.getColaboratorPhone() != null && !newOperationDTO.getColaboratorPhone().isEmpty())
            operation.setColaboratorPhone(newOperationDTO.getColaboratorPhone());
        operation.setProductOption(productService.getProductOptionById(newOperationDTO.getProductOptionId()));
        operation.setAdditionals(new HashSet<>());
        operation.setOperationDetails(newOperationDTO.getOperationData());
        operation.setClient(newOperationDTO.getClient());
        operation.setDocumentation(new HashSet<>());

        return operationRepository.save(operation);
    }






}
