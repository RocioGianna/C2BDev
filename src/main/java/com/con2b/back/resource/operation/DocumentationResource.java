package com.con2b.back.resource.operation;

import com.con2b.back.dto.GenericResponseDTO;
import com.con2b.back.dto.operation.NewOperationDTO;
import com.con2b.back.model.user.User2b;
import com.con2b.back.service.operation.DocumentationService;
import com.con2b.back.service.user.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Optional;

@RestController
@RequestMapping("api/v1/documentation")
@PreAuthorize("isAuthenticated()")
public class DocumentationResource {

    @Autowired
    DocumentationService documentationService;
    @Autowired
    UserService userService;


    @PostMapping("")
    public ResponseEntity<?> saveFile(@RequestParam MultipartFile file, @RequestHeader("userId") Long userId)throws Exception{
        Optional<User2b> user = userService.getUserById(userId);
       if(file != null && !file.isEmpty() && user.isPresent()){
           return ResponseEntity.ok().body(documentationService.saveFile(file, userId));
       }else{
           return ResponseEntity.ok().body(new GenericResponseDTO<>(false,"Error loading documentation"));
       }
    }

    @DeleteMapping("/{documentationId}")
    public ResponseEntity<?> deleteFile(@PathVariable Long documentationId)throws Exception{
        if(documentationService.getDocumentationById(documentationId) != null){
            return ResponseEntity.ok().body(documentationService.deleteFile(documentationId));
        }else {
            return ResponseEntity.ok().body(new GenericResponseDTO<>(false, "Error al cargar documentacion"));
        }
    }

}
