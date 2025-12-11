package com.sohail.todo_management.service;

import com.sohail.todo_management.dto.JwtAuthResponse;
import com.sohail.todo_management.dto.LoginDto;
import com.sohail.todo_management.dto.RegisterDto;

public interface AuthService {
    String register(RegisterDto registerDto);
    JwtAuthResponse login(LoginDto loginDto);
}
