package com.projectmanagement.system.dto.user;

import com.projectmanagement.system.entity.enums.Role;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class UserProfileDto {

    private Long id;
    private String username;
    private String email;
    private Role role;
    private String bio;
    private String displayPicture;
    private boolean approved;
}
