package com.projectmanagement.system.dto.ticket;

import com.projectmanagement.system.dto.comment.CommentDto;
import com.projectmanagement.system.dto.user.UserSummary;
import com.projectmanagement.system.entity.enums.TicketLabel;
import com.projectmanagement.system.entity.enums.TicketStatus;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
public class TicketDto {

    private Long id;
    private String title;
    private String description;
    private TicketLabel label;
    private TicketStatus status;
    private UserSummary assignedTo;
    private UserSummary createdBy;
    private LocalDateTime createdAt;
    private List<CommentDto> comments;
}
