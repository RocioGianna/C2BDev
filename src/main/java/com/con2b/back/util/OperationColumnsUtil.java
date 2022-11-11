package com.con2b.back.util;

import com.con2b.back.model.operation.OperationColumns;
import com.con2b.back.model.operation.Status;
import com.con2b.back.model.user.Role;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@NoArgsConstructor
public class OperationColumnsUtil {
        private final int [][][] functionsByRole = new int [Role.values().length][Status.values().length][OperationColumns.values().length];

        public Boolean isColumnEditable(Role rol, Status status, OperationColumns column){
                return false;
        }

        public List getColumnsEditablesByRoleAndStatus(){
                return null;
        }

}
