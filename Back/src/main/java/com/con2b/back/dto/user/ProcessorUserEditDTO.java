package com.con2b.back.dto.user;

import com.con2b.back.model.operation.Address;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class ProcessorUserEditDTO {
    private String firstName;
    private String lastName;
    private String nid;
    private Address billingAddress;
    private String bankAccount;
}
