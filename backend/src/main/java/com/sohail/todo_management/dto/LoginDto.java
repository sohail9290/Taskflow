package com.sohail.todo_management.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.springframework.web.bind.annotation.ResponseStatus;

@Getter
@Setter
@AllArgsConstructor
@ResponseStatus
public class LoginDto {
    private String usernameOrEmail;
    private String password;
}
