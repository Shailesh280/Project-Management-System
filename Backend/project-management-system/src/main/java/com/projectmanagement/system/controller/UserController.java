package com.projectmanagement.system.controller;

import com.projectmanagement.system.dto.user.ChangePasswordRequest;
import com.projectmanagement.system.dto.user.UpdateProfileRequest;
import com.projectmanagement.system.dto.user.UserProfileDto;
import com.projectmanagement.system.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    /* ===================== ADMIN ===================== */

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public List<UserProfileDto> getAllUsers() {
        return userService.getAllUsers();
    }

    @GetMapping("/pending")
    @PreAuthorize("hasRole('ADMIN')")
    public List<UserProfileDto> getPendingUsers() {
        return userService.getPendingUsers();
    }

    @PostMapping("/{id}/approve")
    @PreAuthorize("hasRole('ADMIN')")
    public void approveUser(@PathVariable Long id) {
        userService.approveUser(id);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public void declineUser(@PathVariable Long id) {
        userService.declineUser(id);
    }

    @PutMapping("/admin/{id}/password")
    @PreAuthorize("hasRole('ADMIN')")
    public void changeUserPassword(
            @PathVariable Long id,
            @RequestBody ChangePasswordRequest request
    ) {
        userService.updateUserPassword(id, request.getPassword());
    }

    /* ===================== CURRENT USER ===================== */

    @GetMapping("/me")
    public UserProfileDto getMyProfile() {
        return userService.getMyProfile();
    }

    @PutMapping("/me")
    public UserProfileDto updateMyProfile(
            @RequestBody UpdateProfileRequest request
    ) {
        return userService.updateMyProfile(request);
    }

    @PutMapping("/me/password")
    public void changeMyPassword(
            @RequestBody ChangePasswordRequest request
    ) {
        userService.changeMyPassword(request.getPassword());
    }

    @PostMapping("/me/profile-picture")
    public String uploadProfilePicture(
            @RequestParam("file") MultipartFile file
    ) throws IOException {
        return userService.uploadProfilePicture(file);
    }
}
