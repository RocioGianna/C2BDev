package com.con2b.back.resource.operation;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/v1/operations")
@PreAuthorize("isAuthenticated()")
public class OperationResource {

}
