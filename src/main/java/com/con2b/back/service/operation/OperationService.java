package com.con2b.back.service.operation;

import com.con2b.back.dto.operation.FullOperationDTO;
import com.con2b.back.dto.operation.NewOperationDTO;
import com.con2b.back.model.operation.*;
import com.con2b.back.repository.operation.StepRepository;
import com.con2b.back.repository.operation.OperationRepository;
import com.con2b.back.service.product.ProductService;
import com.con2b.back.service.user.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.HashSet;
import java.util.Optional;
import java.util.List;

@Service @Transactional
public class OperationService {

    @Autowired
    private StepRepository stepRepository;
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


    public Step saveStep(Step step){
        return stepRepository.save(step);
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

        String operationCode = "XXX";

        Operation operation = new Operation();

        operation.setOperationCode(operationCode);
        operation.setStatus(Status.PENDING);
        operation.setCollaborator(userService.getUserByUserCode(newOperationDTO.getCollaboratorCode()));
        if(newOperationDTO.getCollaboratorEmail() != null && !newOperationDTO.getCollaboratorEmail().isEmpty())
            operation.setCollaboratorEmail(newOperationDTO.getCollaboratorEmail());
        if(newOperationDTO.getCollaboratorPhone() != null && !newOperationDTO.getCollaboratorPhone().isEmpty())
            operation.setCollaboratorPhone(newOperationDTO.getCollaboratorPhone());
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
        if(!newOperationDTO.getDocumentationIds().isEmpty()){
            operation.setDocumentation(documentationService.getAllDocumentsById(newOperationDTO.getDocumentationIds()));
        }

        Operation operationSave = operationRepository.save(operation);

        if(operationSave.getDocumentation() != null && !operationSave.getDocumentation().isEmpty()){
            for(Documentation d: operationSave.getDocumentation()){
                documentationService.updatePathFile(d, operationSave.getId());
            }
        }

        if(newOperationDTO.getOperationDetails() != null) {
            for (OperationDetails od : newOperationDTO.getOperationDetails()) {
                od.setOperation(operationSave);
                operationDetailsId.add(operationDetailsService.saveOperationDetails(od));
            }
        }

        return operationSave;
    }

    public List<Operation> getOperations(){
        return operationRepository.findAll();
    }

}
