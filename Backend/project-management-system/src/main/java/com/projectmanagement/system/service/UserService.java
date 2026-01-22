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
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

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

    public UserProfileDto getMyProfile() {
        User currentUser = SecurityUtils.getCurrentUser();
        return toDto(currentUser);
    }

    public UserProfileDto updateMyProfile(UpdateProfileRequest request) {
        User currentUser = SecurityUtils.getCurrentUser();

        currentUser.setBio(request.getBio());
        currentUser.setDisplayPicture(request.getDisplayPicture());

        return toDto(userRepository.save(currentUser));
    }

    public void approveUser(Long userId) {
        requireAdmin();

        User user = userRepository.findById(userId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("User not found"));

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

    private void requireAdmin() {
        User currentUser = SecurityUtils.getCurrentUser();
        if (currentUser.getRole() != Role.ADMIN) {
            throw new AccessDeniedException("Admin access required");
        }
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
