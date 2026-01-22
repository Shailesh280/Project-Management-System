package com.projectmanagement.system.security;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.projectmanagement.system.dto.error.ApiError;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.time.LocalDateTime;

@Component
public class RestAuthenticationEntryPoint implements AuthenticationEntryPoint {

    @Override
    public void commence(
            HttpServletRequest request,
            HttpServletResponse response,
            AuthenticationException authException
    ) throws IOException {

        int status;
        String message;

        if (authException instanceof DisabledException) {
            status = HttpStatus.FORBIDDEN.value();
            message = "Your account is awaiting admin approval";
        } else {
            status = HttpStatus.UNAUTHORIZED.value();
            message = "Authentication failed";
        }

        ApiError error = ApiError.builder()
                .timestamp(LocalDateTime.now())
                .status(status)
                .error(HttpStatus.valueOf(status).getReasonPhrase())
                .message(message)
                .path(request.getRequestURI())
                .build();

        response.setStatus(status);
        response.setContentType("application/json");
        new ObjectMapper().writeValue(response.getOutputStream(), error);
    }
}
