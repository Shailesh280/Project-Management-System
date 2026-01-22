package com.projectmanagement.system.dto.ticket;

import com.projectmanagement.system.entity.enums.TicketStatus;
import lombok.Data;

@Data
public class UpdateTicketStatusRequest {
    private TicketStatus ticketStatus;
}
