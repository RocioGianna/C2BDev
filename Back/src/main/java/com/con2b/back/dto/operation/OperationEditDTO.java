package com.con2b.back.dto.operation;
import com.con2b.back.model.operation.OperationColumn;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor

public class OperationEditDTO<T> {
    private OperationColumn column;
    private String attribute;
    private T value;

    public OperationEditDTO(T value, String attribute, OperationColumn column) {
        this(column,attribute, value);
    }
}
