package com.sohail.todo_management.service.impl;

import com.sohail.todo_management.Security.JwtTokenProvider;
import com.sohail.todo_management.dto.JwtAuthResponse;
import com.sohail.todo_management.dto.LoginDto;
import com.sohail.todo_management.dto.RegisterDto;
import com.sohail.todo_management.entity.Role;
import com.sohail.todo_management.entity.User;
import com.sohail.todo_management.exception.TodoApiException;
import com.sohail.todo_management.repository.RoleRepository;
import com.sohail.todo_management.repository.UserRepository;
import com.sohail.todo_management.service.AuthService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

@Service
@AllArgsConstructor
public class AuthServiceImpl implements AuthService {

    private UserRepository userRepository;
    private RoleRepository roleRepository;
    private PasswordEncoder passwordEncoder;
    private AuthenticationManager authenticationManager;
    private JwtTokenProvider jwtTokenProvider;


    @Override
    public String register(RegisterDto registerDto) {
        // CHECK USERNAME IS ALREADY EXISTING IN DATABASE
        if(userRepository.existsByUsername(registerDto.getUsername())) {
            throw new TodoApiException(HttpStatus.BAD_REQUEST, "Username is already in use");
        }

        //CHECK EMAIL ALREADY IN USE
        if(userRepository.existsByEmail(registerDto.getEmail())) {
            throw new TodoApiException(HttpStatus.BAD_REQUEST, "Email is already in use");
        }

        User user = new User();
        user.setName(registerDto.getName());
        user.setUsername(registerDto.getUsername());
        user.setEmail(registerDto.getEmail());
        user.setPassword(passwordEncoder.encode(registerDto.getPassword()));

        Set<Role> roles = new HashSet<>();
        Role userRole=roleRepository.findByName("ROLE_USER");
        roles.add(userRole);
        userRepository.save(user);
        return "User registered successfully";
    }

    @Override
    public JwtAuthResponse login(LoginDto loginDto) {
        Authentication authentication= authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                loginDto.getUsernameOrEmail(),
                loginDto.getPassword()
        ));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String token = jwtTokenProvider.generateToken(authentication);
        Optional<User> userOptional= userRepository.findByUsernameOrEmail(loginDto.getUsernameOrEmail(),loginDto.getUsernameOrEmail());
        String role=null;
        if(userOptional.isPresent()) {
            User loggedIn=userOptional.get();
            Optional<Role> optionalRole=loggedIn.getRoles().stream().findFirst();
            if(optionalRole.isPresent()) {
                Role userRole=optionalRole.get();
                role= userRole.getName();
            }
        }

        JwtAuthResponse jwtAuthResponse=new JwtAuthResponse();
        jwtAuthResponse.setRole(role);
        jwtAuthResponse.setAccessToken(token);
        return jwtAuthResponse;
    }
}
