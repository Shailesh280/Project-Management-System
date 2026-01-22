package com.projectmanagement.system.mapper;

import com.projectmanagement.system.dto.ticket.TicketDto;
import com.projectmanagement.system.dto.user.UserSummary;
import com.projectmanagement.system.entity.Ticket;

import java.util.stream.Collectors;

public class TicketMapper {

    public static TicketDto toDto(Ticket ticket) {
        return TicketDto.builder()
                .id(ticket.getId())
                .title(ticket.getTitle())
                .description(ticket.getDescription())
                .label(ticket.getLabel())
                .status(ticket.getStatus())
                .createdAt(ticket.getCreatedAt())
                .assignedTo(
                        UserSummary.builder()
                                .id(ticket.getAssignedTo().getId())
                                .username(ticket.getAssignedTo().getUsername())
                                .email(ticket.getAssignedTo().getEmail())
                                .build()
                )
                .createdBy(
                        UserSummary.builder()
                                .id(ticket.getCreatedBy().getId())
                                .username(ticket.getCreatedBy().getUsername())
                                .email(ticket.getCreatedBy().getEmail())
                                .build()
                )
                .build();
    }
}
