package com.con2b.back.model.operation;

import com.con2b.back.model.user.Role;
import com.fasterxml.jackson.databind.JavaType;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.Getter;
import lombok.Setter;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.util.Map;
import java.util.Set;


@Getter
@Setter
public class OperationEditPermissions {

    private Map<Role, Map<Status, Set<OperationColumn>>> map;

    public OperationEditPermissions () throws IOException {
        ObjectMapper mapper = new ObjectMapper();
        JavaType setType = mapper.getTypeFactory().constructCollectionType(Set.class, OperationColumn.class);
        JavaType statusType = mapper.getTypeFactory().constructType(Status.class);
        JavaType mapStatusType = mapper.getTypeFactory().constructMapType(Map.class, statusType, setType);
        JavaType roleType = mapper.getTypeFactory().constructType(Role.class);
        JavaType mapTypes = mapper.getTypeFactory().constructMapType(Map.class, roleType, mapStatusType);

        BufferedReader json = new BufferedReader(new FileReader("src/main/resources/operations/dataStructure.json"));


        this.map = mapper.readValue(json, mapTypes);
    }


    public Boolean isColumnEditable(Role rol, Status status, OperationColumn column) {
        Map<Status, Set<OperationColumn>> columns = this.map.get(rol);

        return columns.get(status).contains(column);
    }


    public  Map<Status, Set<OperationColumn>> getColumnsEditablesByRoleAndStatus(Role rol)  {
        return this.map.get(rol);
    }
}
