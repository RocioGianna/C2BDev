package com.con2b.back.dto;

public class GenericResponseDTO<T> {
    private boolean ok;
    private T data;

    public GenericResponseDTO(boolean ok, T data) {
        this.ok = ok;
        this.data = data;
    }

    public GenericResponseDTO(T data) {
        this(true, data);
    }

    public boolean isOk() {
        return ok;
    }

    public void setOk(boolean ok) {
        this.ok = ok;
    }

    public T getData() {
        return data;
    }

    public void setData(T data) {
        this.data = data;
    }
}
