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
public class OperationPossibleStatus {

    private  Map<Status, Set<Status>> map;

    public OperationPossibleStatus () throws IOException {
        ObjectMapper mapper = new ObjectMapper();
        JavaType setType = mapper.getTypeFactory().constructCollectionType(Set.class, Status.class);
        JavaType statusType = mapper.getTypeFactory().constructType(Status.class);
        JavaType mapStatusType = mapper.getTypeFactory().constructMapType(Map.class, statusType, setType);

        BufferedReader json = new BufferedReader(new FileReader("src/main/resources/operations/statesStructure.json"));

        this.map = mapper.readValue(json, mapStatusType);
    }

    public  Map<Status, Set<Status>> getPossibleNextStatus()  {
        return this.map;
    }

}
