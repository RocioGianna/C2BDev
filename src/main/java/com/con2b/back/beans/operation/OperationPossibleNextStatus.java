package com.con2b.back.beans.operation;

import com.con2b.back.model.operation.Status;
import com.fasterxml.jackson.databind.JavaType;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.Getter;
import lombok.Setter;
import org.springframework.util.ResourceUtils;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.util.Map;
import java.util.Set;

@Getter
@Setter
public class OperationPossibleNextStatus {

    private  Map<Status, Set<Status>> map;

    public OperationPossibleNextStatus () throws IOException {
        ObjectMapper mapper = new ObjectMapper();
        JavaType setType = mapper.getTypeFactory().constructCollectionType(Set.class, Status.class);
        JavaType statusType = mapper.getTypeFactory().constructType(Status.class);
        JavaType mapStatusType = mapper.getTypeFactory().constructMapType(Map.class, statusType, setType);

        BufferedReader json = new BufferedReader(new FileReader(ResourceUtils.getFile("classpath:operation/statusMap.json")));

        this.map = mapper.readValue(json, mapStatusType);
    }

    public Set<Status> getPossibleNextStatusFromStatus(Status status){
        return this.map.get(status);
    }


}
