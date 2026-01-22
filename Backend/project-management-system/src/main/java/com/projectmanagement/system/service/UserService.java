package com.projectmanagement.system.service;

import com.projectmanagement.system.dto.user.UpdateProfileRequest;
import com.projectmanagement.system.dto.user.UserProfileDto;
import com.projectmanagement.system.entity.User;
import com.projectmanagement.system.entity.enums.Role;
import com.projectmanagement.system.exception.AccessDeniedException;
import com.projectmanagement.system.exception.ResourceNotFoundException;
import com.projectmanagement.system.repository.UserRepository;
import com.projectmanagement.system.security.SecurityUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;


@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    /* ===================== ADMIN FUNCTIONS ===================== */

    public List<UserProfileDto> getAllUsers() {
        requireAdmin();
        return userRepository.findByApprovedTrue()
                .stream()
                .map(this::toDto)
                .toList();
    }

    public List<UserProfileDto> getPendingUsers() {
        requireAdmin();
        return userRepository.findByApprovedFalse()
                .stream()
                .map(this::toDto)
                .toList();
    }

    public void approveUser(Long userId) {
        requireAdmin();

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        user.setApproved(true);
        userRepository.save(user);
    }

    public void declineUser(Long userId) {
        requireAdmin();

        if (!userRepository.existsById(userId)) {
            throw new ResourceNotFoundException("User not found");
        }

        userRepository.deleteById(userId);
    }

    /* ===================== USER PROFILE ===================== */

    public UserProfileDto getMyProfile() {
        User currentUser = SecurityUtils.getCurrentUser();
        return toDto(currentUser);
    }

    public UserProfileDto updateMyProfile(UpdateProfileRequest request) {
        User currentUser = SecurityUtils.getCurrentUser();

        if (request.getUsername() != null && !request.getUsername().isBlank()) {
            currentUser.setUsername(request.getUsername());
        }

        currentUser.setBio(request.getBio());

        if (request.getDisplayPicture() != null) {
            currentUser.setDisplayPicture(request.getDisplayPicture());
        }

        return toDto(userRepository.save(currentUser));
    }

    /* ===================== PASSWORD ===================== */

    // ADMIN: reset any user's password
    public void updateUserPassword(Long userId, String rawPassword) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        user.setPassword(passwordEncoder.encode(rawPassword));
        userRepository.save(user);
    }

    // USER: change own password (already authenticated)
    public void changeMyPassword(String rawPassword) {
        User currentUser = SecurityUtils.getCurrentUser();
        currentUser.setPassword(passwordEncoder.encode(rawPassword));
        userRepository.save(currentUser);
    }

    /* ===================== INTERNAL ===================== */

    private void requireAdmin() {
        User currentUser = SecurityUtils.getCurrentUser();
        if (currentUser.getRole() != Role.ADMIN) {
            throw new AccessDeniedException("Admin access required");
        }
    }

    public String uploadProfilePicture(MultipartFile file) throws IOException {
        User user = SecurityUtils.getCurrentUser();

        String filename = UUID.randomUUID() + "_" + file.getOriginalFilename();
        Path uploadPath = Paths.get("uploads");

        Files.createDirectories(uploadPath);
        Files.copy(file.getInputStream(), uploadPath.resolve(filename));

        user.setDisplayPicture(filename);
        userRepository.save(user);

        return filename;
    }


    private UserProfileDto toDto(User user) {
        return new UserProfileDto(
                user.getId(),
                user.getUsername(),
                user.getEmail(),
                user.getRole(),
                user.getBio(),
                user.getDisplayPicture(),
                user.isApproved()
        );
    }
}
