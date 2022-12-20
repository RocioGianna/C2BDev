package com.con2b.back.dto.user;

import com.con2b.back.model.user.Role;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class AdminUserEditDTO extends ProcessorUserEditDTO{
    private String userCode;
    private String refererCode;
    private Role role;
}
