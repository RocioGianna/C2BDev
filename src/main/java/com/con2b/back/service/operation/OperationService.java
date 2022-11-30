package com.con2b.back.service.operation;

import com.con2b.back.beans.operation.OperationEditPermissions;
import com.con2b.back.beans.operation.OperationPossibleNextStatus;
import com.con2b.back.dto.operation.FullOperationDTO;
import com.con2b.back.dto.operation.NewOperationDTO;
import com.con2b.back.dto.operation.OperationEditDTO;
import com.con2b.back.model.operation.*;
import com.con2b.back.model.user.Role;
import com.con2b.back.model.user.User2b;
import com.con2b.back.repository.operation.LineTypeRepository;
import com.con2b.back.repository.operation.OperationRepository;
import com.con2b.back.service.product.ProductService;
import com.con2b.back.service.user.UserService;
import org.apache.catalina.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.lang.reflect.Method;
import java.util.HashSet;
import java.util.Optional;
import java.util.List;


import static org.springframework.util.StringUtils.capitalize;

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
    @Autowired
    private OperationEditPermissions operationEditPermissions;
    @Autowired
    private OperationPossibleNextStatus operationPossibleNextStatus;


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

        return operationSave;
    }

    public List<Operation> getOperations(){
        return operationRepository.findAll();
    }

    public Operation editOperation(OperationEditDTO operationEditDTO, Long operationId, Role role) throws Exception {
        Optional<Operation> operation = operationRepository.findById(operationId);
        if(operation.isEmpty()){
            throw new Exception("The operation id is invalid");
        }
        OperationColumn column = operationEditDTO.getColumn();
        Object instance = null;
        String methodName = "set"+ capitalize(operationEditDTO.getAttribute());
        Status status = operation.get().getStatus();

        if(!operationEditPermissions.isColumnEditable(role, status, column)){
            throw new Exception("The current client can't edit this field.");
        }

        switch(column){
            case OPERATION_CODE:
                operation.get().setOperationCode((String) operationEditDTO.getValue());
                break;
            case REPROCESS:
                operation.get().setReprocess((Boolean)operationEditDTO.getValue());
                break;
            case STATUS:
                if(operationPossibleNextStatus.getPossibleNextStatusFromStatus(status).contains(Status.valueOf(operationEditDTO.getValue().toString()))){
                    operation.get().setStatus(Status.valueOf(operationEditDTO.getValue().toString()));
                }else{
                    throw new Exception("Isn't possible change the status.");
                }
                break;
            case CHANNEL:
                operation.get().setChannel(Channel.valueOf(operationEditDTO.getValue().toString()));
                break;
            case PROCESSOR:
                Long processorId = Long.parseLong(operationEditDTO.getValue().toString());
                User2b processor = userService.getUserById(processorId).get();
                operation.get().setProcessor(processor);
                break;
            case COLLABORATOR:
                operation.get().setCollaborator((User2b) operationEditDTO.getValue());
                break;
            case COLLABORATOR_EMAIL:
                operation.get().setCollaboratorEmail(operationEditDTO.getValue().toString());
                break;
            case COLLABORATOR_PHONE:
                operation.get().setCollaboratorPhone(operationEditDTO.getValue().toString());
                break;
            case CUSTOMER:
                operation.get().setCustomer((Customer) operationEditDTO.getValue());
                break;
            case INSTALLATION_ADDRESS:
                operation.get().setInstallationAddress((Address) operationEditDTO.getValue());
                break;
            case SHIPPING_ADDRESS:
                operation.get().setShippingAddress((Address) operationEditDTO.getValue());
                break;
        }

        return operationRepository.save(operation.get());
    }

    public Operation editOperationDetails(OperationEditDTO operationEditDTO, Long detailsId, Long operationId, Role role) throws Exception {
        Optional<Operation> operation = operationRepository.findById(operationId);
        if(operation.isEmpty()){
            throw new Exception("The operation id is invalid");
        }
        OperationColumn column = operationEditDTO.getColumn();
        Status status = operation.get().getStatus();
        if(!operationEditPermissions.isColumnEditable(role, status, column)){
            throw new Exception("The current client can't edit this field.");
        }

        String methodName = "set"+ capitalize(operationEditDTO.getAttribute());
        OperationDetails instance = operationDetailsService.getOperationDetailById(detailsId);
        Method method = instance.getClass().getDeclaredMethod(methodName, operationEditDTO.getValue().getClass());
        method.invoke(instance,operationEditDTO.getValue());
        return operationRepository.save(operation.get());
    }
}
