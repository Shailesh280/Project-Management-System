package com.projectmanagement.system.dto.comment;

import com.projectmanagement.system.dto.user.UserSummary;
import lombok.Builder;
import lombok.Data;
import java.time.LocalDateTime;

@Data
@Builder
public class CommentDetailsDto {
    private Long commentId;
    private String content;
    private LocalDateTime createdAt;

    private UserSummary author;

    private Long ticketId;
    private String ticketTitle;
    private String ticketLabel;
    private String ticketStatus;

    private UserSummary assignedTo;
    private UserSummary createdBy;
}
