package com.projectmanagement.system.dto.ticket;

import com.projectmanagement.system.entity.enums.TicketLabel;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class CreateTicketRequest {

    @NotBlank
    private String title;

    @NotBlank
    private String description;

    @NotNull
    private TicketLabel label;   // ✅ STRING, not enum

    @NotNull
    private Long assignedToUserId;
}
