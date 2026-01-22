package com.projectmanagement.system.dto.ticket;

import com.projectmanagement.system.entity.Ticket;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class RecentTicketActivityDto {

    private Long id;
    private String title;
    private String status;
    private String assignedTo;
    private LocalDateTime updatedAt;

    public static RecentTicketActivityDto from(Ticket ticket) {
        return RecentTicketActivityDto.builder()
                .id(ticket.getId())
                .title(ticket.getTitle())
                .status(ticket.getStatus().name())
                .assignedTo(
                        ticket.getAssignedTo() != null
                                ? ticket.getAssignedTo().getUsername()
                                : "-"
                )
                .updatedAt(ticket.getUpdatedAt())
                .build();
    }
}
