package com.con2b.back.util;

import com.con2b.back.model.operation.OperationColumn;
import com.con2b.back.model.operation.Status;
import com.con2b.back.model.user.Role;
import lombok.NoArgsConstructor;
import org.springframework.data.util.Pair;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

@Service
@NoArgsConstructor
public class OperationColumnsUtil {
        public Boolean isColumnEditable(Role rol, Status status, OperationColumn column){
                Set<OperationColumn> columns = functionsByRole.get(Pair.of(rol,status));
                return columns.contains(column);
        }

        public Set<OperationColumn> getColumnsEditablesByRoleAndStatus(Role rol, Status status,Map<Pair<Role,Status>){
                return functionsByRole.get(Pair.of(rol,status));
        }

}
