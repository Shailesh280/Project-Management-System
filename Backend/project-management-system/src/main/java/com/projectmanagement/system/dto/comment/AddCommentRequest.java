package com.projectmanagement.system.dto.comment;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class AddCommentRequest {

    @NotNull
    private Long ticketId;
    @NotBlank
    private String content;
}
