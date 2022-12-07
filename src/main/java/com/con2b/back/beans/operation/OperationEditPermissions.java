package com.con2b.back.beans.operation;

import com.con2b.back.model.operation.OperationColumn;
import com.con2b.back.model.operation.Status;
import com.con2b.back.model.user.Role;
import com.fasterxml.jackson.databind.JavaType;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.Getter;
import lombok.Setter;
import org.springframework.core.io.ClassPathResource;
import org.springframework.util.ResourceUtils;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.Map;
import java.util.Set;


@Getter
@Setter
public class OperationEditPermissions {

    private Map<Role, Map<Status, Set<OperationColumn>>> map;

    public OperationEditPermissions () throws IOException {
        ObjectMapper mapper = new ObjectMapper();

        JavaType statusType = mapper.getTypeFactory().constructType(Status.class);
        JavaType roleType = mapper.getTypeFactory().constructType(Role.class);
        JavaType operationColumnsSetType = mapper.getTypeFactory().constructCollectionType(Set.class, OperationColumn.class);
        JavaType operationColumnsByStateMapType = mapper.getTypeFactory().constructMapType(Map.class, statusType, operationColumnsSetType);
        JavaType operationEditPermissionsType = mapper.getTypeFactory().constructMapType(Map.class, roleType, operationColumnsByStateMapType);


        BufferedReader json = new BufferedReader(new InputStreamReader(new ClassPathResource("operation/editPermissions.json").getInputStream()));

        this.map = mapper.readValue(json, operationEditPermissionsType);
    }


    public Boolean isColumnEditable(Role role, Status status, OperationColumn column) {
        return this.map.get(role).get(status).contains(column);
    }


    public  Map<Status, Set<OperationColumn>> getEditableColumnsByRoleAndStatus(Role rol)  {
        return this.map.get(rol);
    }
}
