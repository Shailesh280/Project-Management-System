package com.projectmanagement.system.service;

import com.projectmanagement.system.dto.auth.AuthResponse;
import com.projectmanagement.system.dto.auth.LoginRequest;
import com.projectmanagement.system.dto.auth.RegisterRequest;
import com.projectmanagement.system.entity.User;
import com.projectmanagement.system.entity.enums.Role;
import com.projectmanagement.system.exception.DuplicateResourceException;
import com.projectmanagement.system.exception.ResourceNotFoundException;
import com.projectmanagement.system.exception.UnauthorizedException;
import com.projectmanagement.system.repository.UserRepository;
import com.projectmanagement.system.security.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public AuthResponse register(RegisterRequest request) {

        if (userRepository.existsByEmail(request.getEmail())) {
            throw new DuplicateResourceException("Email already exists");
        }

        if (userRepository.existsByUsername(request.getUsername())) {
            throw new DuplicateResourceException("Username already exists");
        }

        User user = User.builder()
                .username(request.getUsername())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(Role.EMPLOYEE)
                .approved(false)
                .bio(request.getBio())
                .displayPicture(
                        request.getDisplayPicture() != null
                                ? request.getDisplayPicture()
                                : "default-avatar.png"
                )
                .build();

        userRepository.save(user);

        return new AuthResponse(
                jwtService.generateToken(user)
        );
    }

    public AuthResponse login(LoginRequest request) {

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() ->
                        new ResourceNotFoundException("User not found"));

        if (!user.isApproved()) {
            throw new UnauthorizedException(
                    "Your account is awaiting admin approval"
            );
        }

        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );

        return new AuthResponse(
                jwtService.generateToken(user)
        );
    }
}
