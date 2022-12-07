package com.con2b.back.resource.operation;

import com.con2b.back.dto.GenericResponseDTO;
import com.con2b.back.dto.operation.NewOperationDTO;
import com.con2b.back.dto.operation.OperationDetailEditDTO;
import com.con2b.back.dto.operation.OperationEditDTO;
import com.con2b.back.dto.operation.SmallOperationDTO;
import com.con2b.back.beans.operation.OperationEditPermissions;
import com.con2b.back.beans.operation.OperationPossibleNextStatus;
import com.con2b.back.model.user.User2b;
import com.con2b.back.service.operation.OperationService;
import com.con2b.back.service.user.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
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
    @Autowired
    private OperationEditPermissions operationEditPermissions;

    @Autowired
    private OperationPossibleNextStatus operationPossibleNextStatus;

    @PostMapping("")
    @PreAuthorize("hasAnyRole('COLLABORATOR_MOVISTAR', 'COLLABORATOR_ALL')")
    public ResponseEntity<?> createOperation(@RequestBody NewOperationDTO newOperationDTO, @RequestHeader("userId") Long userId )throws Exception{
        Optional<User2b> opUser = userService.getUserById(userId);
        if(opUser.isPresent() && newOperationDTO.getCollaboratorCode().equals(opUser.get().getUserCode()) ){
            return ResponseEntity.ok().body(new GenericResponseDTO<>(operationService.createOperation(newOperationDTO)));
        }else{
            return ResponseEntity.ok().body(new GenericResponseDTO(false,"Collaborator code doesn't match with user code"));
        }
    }

    @PostMapping("/admin")
    @PreAuthorize("hasAnyRole('PROCESSOR_ADVANCED', 'MANAGER', 'ADMIN', 'SUPER_ADMIN')")
    public ResponseEntity<?> createOperationAdmin(@RequestBody NewOperationDTO newOperationDTO)throws Exception{
        User2b user = userService.getUserByUserCode(newOperationDTO.getCollaboratorCode());

        if(user != null ){
            return ResponseEntity.ok().body(new GenericResponseDTO<>(operationService.createOperation(newOperationDTO)));
        }else{
            return ResponseEntity.ok().body(new GenericResponseDTO(false,"Collaborator code doesn't match with user code"));
        }
    }

    @GetMapping("/{operationId}")
    public ResponseEntity<?> getOperationDetail(@PathVariable Long operationId) {
        try{
            return ResponseEntity.ok().body(new GenericResponseDTO(operationService.getFullOperationDTO(operationId)));
        }catch (Exception e){
            return new ResponseEntity<>(new GenericResponseDTO(false,"Operation id not found."), HttpStatus.NOT_FOUND);
        }
    }
    
    @GetMapping("")
    // @PreAuthorize("hasRole('ADMIN')") // Temporarily removed until collaborator method is implemented
    public ResponseEntity<?> getOperationsSmall(){
        return ResponseEntity.ok().body(new GenericResponseDTO(operationService.getOperations().stream().map(SmallOperationDTO::new).collect(Collectors.toList())));
    }

    @GetMapping("/edit-permissions")
    public ResponseEntity<?> getEditableColumns(@RequestHeader("userId") Long userId) {
        Optional<User2b> opUser = userService.getUserById(userId);
        if(opUser.isPresent()) {
            return ResponseEntity.ok().body(new GenericResponseDTO(true, operationEditPermissions.getEditableColumnsByRoleAndStatus(opUser.get().getRole())));
        }else{
            return ResponseEntity.ok().body(new GenericResponseDTO(false, "UserId not found"));
        }
    }

    @GetMapping("/status-map")
    public ResponseEntity<?> getPossibleNextStatus() {
        return ResponseEntity.ok().body(new GenericResponseDTO(true, operationPossibleNextStatus.getMap()));
    }

    @PutMapping("/{operationId}")
    public ResponseEntity<?> editOperation(@RequestBody OperationEditDTO value, @PathVariable Long operationId, @RequestHeader("userId") Long userId ) throws Exception {
        try{
            Optional<User2b> opUser = userService.getUserById(userId);
            if(opUser.isPresent()) {
                return ResponseEntity.ok().body(new GenericResponseDTO(operationService.editOperation(value, operationId, opUser.get().getRole())));
            }else{
                return ResponseEntity.ok().body(new GenericResponseDTO(false, "UserId not found"));
            }
        }catch (Exception e){
            return ResponseEntity.ok().body(new GenericResponseDTO(false,"Operation id not found."));
        }
    }

    @PutMapping("/{operationId}/{detailsId}")
    public ResponseEntity<?> editOperationDetails(@RequestBody OperationDetailEditDTO value, @PathVariable Long operationId, @PathVariable Long detailsId, @RequestHeader("userId") Long userId) throws Exception {
        try{
            Optional<User2b> opUser = userService.getUserById(userId);
            if(opUser.isPresent()) {
                return ResponseEntity.ok().body(new GenericResponseDTO(operationService.editOperationDetails(value, detailsId, operationId, opUser.get().getRole())));
            }else{
                return ResponseEntity.ok().body(new GenericResponseDTO(false, "UserId not found"));
            }
        }catch (Exception e){
            return ResponseEntity.ok().body(new GenericResponseDTO(false,"Operation id not found."));
        }
    }

}
