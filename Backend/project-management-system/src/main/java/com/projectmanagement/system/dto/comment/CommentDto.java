package com.projectmanagement.system.dto.comment;

import com.projectmanagement.system.dto.user.UserSummary;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class CommentDto {
    private Long id;
    private String content;
    private LocalDateTime createdAt;
    private String ticketStatus;
    private UserSummary author;
}
