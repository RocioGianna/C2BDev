package com.con2b.back.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class GenericResponseDTO<T> {
    private boolean ok;
    private T data;

    public GenericResponseDTO(T data) {
        this(true, data);
    }

}
