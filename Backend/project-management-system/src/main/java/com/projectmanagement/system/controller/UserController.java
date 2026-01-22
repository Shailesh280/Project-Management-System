package com.projectmanagement.system.controller;

import com.projectmanagement.system.dto.user.ChangePasswordRequest;
import com.projectmanagement.system.dto.user.UpdateProfileRequest;
import com.projectmanagement.system.dto.user.UserProfileDto;
import com.projectmanagement.system.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping
    public List<UserProfileDto> getAllUsers() {
        return userService.getAllUsers();
    }

    @GetMapping("/pending")
    public List<UserProfileDto> getPendingUsers() {
        return userService.getPendingUsers();
    }

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

    @PostMapping("/{id}/approve")
    public void approveUser(@PathVariable Long id) {
        userService.approveUser(id);
    }

    @DeleteMapping("/{id}")
    public void declineUser(@PathVariable Long id) {
        userService.declineUser(id);
    }

    // ✅ ADD THIS — ADMIN CHANGE USER PASSWORD
    @PutMapping("/admin/{id}/password")
    @PreAuthorize("hasRole('ADMIN')")
    public void changeUserPassword(
            @PathVariable Long id,
            @RequestBody ChangePasswordRequest request
    ) {
        userService.updateUserPassword(id, request.getPassword());
    }
}
