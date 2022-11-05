package com.con2b.back.resource.operation;

import com.con2b.back.dto.GenericResponseDTO;
import com.con2b.back.dto.operation.NewOperationDTO;
import com.con2b.back.dto.operation.SmallOperationDTO;
import com.con2b.back.dto.product.ProductDTO;
import com.con2b.back.model.user.User2b;
import com.con2b.back.service.operation.OperationService;
import com.con2b.back.service.user.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("api/v1/operations")
@PreAuthorize("isAuthenticated()")
public class OperationResource {

    @Autowired
    private OperationService operationService;
    @Autowired
    private UserService userService;

    @PostMapping("")
    @PreAuthorize("hasRole('COLABORATOR')")
    public ResponseEntity<?> createOperationAdm(@RequestBody NewOperationDTO newOperationDTO, @RequestHeader("userId") Long userId )throws Exception{
        Optional<User2b> opUser = userService.getUserById(userId);

        if(opUser.isPresent() && newOperationDTO.getColaboratorCode().equals(opUser.get().getUserCode()) ){
            return ResponseEntity.ok().body(new GenericResponseDTO<>(operationService.createOperation(newOperationDTO)));
        }else{
            return ResponseEntity.ok().body(new GenericResponseDTO(false,"Colaborator code doesn't match with user code"));
        }
    }

    @PostMapping("/admin")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> createOperationUser(@RequestBody NewOperationDTO newOperationDTO)throws Exception{
        User2b user = userService.getUserByUserCode(newOperationDTO.getColaboratorCode());

        if(user != null ){
            return ResponseEntity.ok().body(new GenericResponseDTO<>(operationService.createOperation(newOperationDTO)));
        }else{
            return ResponseEntity.ok().body(new GenericResponseDTO(false,"Colaborator code doesn't match with user code"));
        }
    }

//    @GetMapping("")
//    @PreAuthorize("hasRole('COLABORATOR')")
//    public ResponseEntity<?> getOperations(){
//        return ResponseEntity.ok().body(new GenericResponseDTO(operationService.getOperations().stream().map(SmallOperationDTO::new).collect(Collectors.toList())));
//    }

    @GetMapping("")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> getOperationsSmall(){
        return ResponseEntity.ok().body(new GenericResponseDTO(operationService.getOperations().stream().map(SmallOperationDTO::new).collect(Collectors.toList())));
    }


}
