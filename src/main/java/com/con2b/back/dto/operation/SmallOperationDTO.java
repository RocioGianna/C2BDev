package com.con2b.back.dto.operation;

import com.con2b.back.model.operation.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class SmallOperationDTO {

    private Date creationDate;
    private String operationCode;
    private String channelName;
    private String status;
    private String processorId;
    private String collaboratorCode;
    private String customerLastName;

    private Long id;

    public SmallOperationDTO(Operation operation){
        creationDate = operation.getCreationDate();
        operationCode = operation.getOperationCode();
        channelName = operation.getChannel() != null ? operation.getChannel().name() : null;
        collaboratorCode = operation.getCollaborator().getUserCode();
        customerLastName = operation.getCustomer() != null ? operation.getCustomer().getLastName() : null;
        processorId = operation.getProcessor() != null ? operation.getProcessor().getUserCode() : null;
        status = operation.getStatus().name();
        id = operation.getId();
    }

}
