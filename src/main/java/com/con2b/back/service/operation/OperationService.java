package com.con2b.back.service.operation;

import com.con2b.back.dto.operation.FullOperationDTO;
import com.con2b.back.dto.operation.NewOperationDTO;
import com.con2b.back.model.operation.*;
import com.con2b.back.repository.operation.DocumentationRepository;
import com.con2b.back.repository.operation.LineTypeRepository;
import com.con2b.back.repository.operation.OperationRepository;
import com.con2b.back.service.product.ProductService;
import com.con2b.back.service.user.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.io.IOException;
import java.util.HashSet;
import java.util.Optional;
import java.util.List;


@Service @Transactional
public class OperationService {

    @Autowired
    private LineTypeRepository lineTypeRepository;
    @Autowired
    private OperationRepository operationRepository;
    @Autowired
    private DocumentationService documentationService;
    @Autowired
    private ProductService productService;
    @Autowired
    private CustomerService customerService;
    @Autowired
    private AddressService addressService;
    @Autowired
    private OperationDetailsService operationDetailsService;
    @Autowired
    private UserService userService;


    public LineType saveLineType(LineType lineType){
        return lineTypeRepository.save(lineType);
    }

    public Operation getOperation(Long operationId) throws Exception {
        Optional<Operation> operation = operationRepository.findById(operationId);
        if(operation.isEmpty()){
            throw new Exception("The operation id is invalid");
        }
        return operation.get();
    }

    public FullOperationDTO getFullOperationDTO(Long operationId) throws Exception {
        return new FullOperationDTO(getOperation(operationId));
    }



    public Operation createOperation(NewOperationDTO newOperationDTO) throws Exception {
        //TODO implement refererCode and messages
        
        HashSet<OperationDetails> operationDetailsId = new HashSet<>();
        Customer customer = customerService.saveCustomer(newOperationDTO.getCustomer());
        Address installationAddress = addressService.saveAddress(newOperationDTO.getInstallationAddress());
        Address shippingAddress = addressService.saveAddress(newOperationDTO.getShippingAddress());
        if(newOperationDTO.getOperationDetails() != null) {
            for (OperationDetails od : newOperationDTO.getOperationDetails()) {
                operationDetailsId.add(operationDetailsService.saveOperationDetails(od));
            }
        }

        String operationCode = "XXX";

        Operation operation = new Operation();

        operation.setOperationCode(operationCode);
        operation.setStatus(Status.PENDING);
        operation.setColaborator(userService.getUserByUserCode(newOperationDTO.getColaboratorCode()));
        if(newOperationDTO.getColaboratorEmail() != null && !newOperationDTO.getColaboratorEmail().isEmpty())
            operation.setColaboratorEmail(newOperationDTO.getColaboratorEmail());
        if(newOperationDTO.getColaboratorPhone() != null && !newOperationDTO.getColaboratorPhone().isEmpty())
            operation.setColaboratorPhone(newOperationDTO.getColaboratorPhone());
        operation.setProductOption(productService.getProductOptionById(newOperationDTO.getProductOptionId()));
        if(newOperationDTO.getAdditionalIds() != null && !newOperationDTO.getAdditionalIds().isEmpty()) {
            operation.setAdditionalProducts(productService.getAdditionalProductOptionsById(newOperationDTO.getAdditionalIds()));
        }
        operation.setOperationDetails(operationDetailsId);
        if(customer != null) {
            operation.setCustomer(customer);
        }
        if(installationAddress != null ){
            operation.setInstallationAddress(installationAddress);
        }
        if(shippingAddress != null){
            operation.setShippingAddress(shippingAddress);
        }
        if(!newOperationDTO.getDocumentationId().isEmpty()){
            operation.setDocumentation(documentationService.getAllDocumentsById(newOperationDTO.getDocumentationId()));
        }

        Operation operationSave = operationRepository.save(operation);

        for(Documentation d: operationSave.getDocumentation()){
            documentationService.updatePathFile(d, operationSave.getId());
        }

        return operationSave;
    }

    public List<Operation> getOperations(){
        return operationRepository.findAll();
    }

}
